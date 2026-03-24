import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventCacheDto } from './dto/create-event-cache.dto';

@Injectable()
export class EventCachesService {
  constructor(private prisma: PrismaService) {}

  async create(eventId: string, dto: CreateEventCacheDto, userId: string) {
    const event = await this.prisma.events.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');
    if (event.creatorId !== userId) throw new ForbiddenException();

    return this.prisma.eventCaches.create({
      data: { ...dto, eventId },
    });
  }

  async findAll(eventId: string) {
    return this.prisma.eventCaches.findMany({ where: { eventId } });
  }

  async discover(eventId: string, cacheId: string, userId: string) {
    const cache = await this.prisma.eventCaches.findUnique({
      where: { id: cacheId },
    });

    if (!cache || cache.eventId !== eventId) {
      throw new NotFoundException('Cache not found');
    }

    if (cache.isAlreadyFound) {
      throw new BadRequestException('Cache already found');
    }

    const membership = await this.prisma.eventMembers.findFirst({
      where: { eventId, userId },
    });

    if (!membership) {
      throw new ForbiddenException('Not a member of this event');
    }

    const [updatedCache] = await this.prisma.$transaction([
      this.prisma.eventCaches.update({
        where: { id: cacheId },
        data: { isAlreadyFound: true, foundBy: userId },
      }),
      this.prisma.user.update({
        where: { id: userId },
        data: { experiencePoints: { increment: cache.experiencePoints } },
      }),
    ]);

    return updatedCache;
  }
}
