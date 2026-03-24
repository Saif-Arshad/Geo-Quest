import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEventDto, creatorId: string) {
    const inviteCode = randomBytes(4).toString('hex').toUpperCase();

    return this.prisma.events.create({
      data: {
        ...dto,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        inviteCode,
        creatorId,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.events.findMany({
      where: {
        OR: [
          { creatorId: userId },
          { eventMembers: { some: { userId } } },
        ],
      },
      include: { _count: { select: { eventMembers: true, eventCaches: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.events.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, name: true, profileImage: true },
        },
        _count: { select: { eventMembers: true, eventCaches: true } },
      },
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, dto: Partial<CreateEventDto>, userId: string) {
    const event = await this.prisma.events.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    if (event.creatorId !== userId) throw new ForbiddenException();

    return this.prisma.events.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.startTime && { startTime: new Date(dto.startTime) }),
        ...(dto.endTime && { endTime: new Date(dto.endTime) }),
      },
    });
  }

  async remove(id: string, userId: string) {
    const event = await this.prisma.events.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    if (event.creatorId !== userId) throw new ForbiddenException();

    await this.prisma.events.delete({ where: { id } });
    return { message: 'Event deleted' };
  }

  async getLeaderboard(eventId: string) {
    const event = await this.prisma.events.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');

    const caches = await this.prisma.eventCaches.findMany({
      where: { eventId, isAlreadyFound: true },
      select: { foundBy: true, experiencePoints: true },
    });

    const scores: Record<string, number> = {};
    for (const cache of caches) {
      if (cache.foundBy) {
        scores[cache.foundBy] = (scores[cache.foundBy] || 0) + cache.experiencePoints;
      }
    }

    const userIds = Object.keys(scores);
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, profileImage: true },
    });

    return users
      .map((user) => ({ ...user, score: scores[user.id] }))
      .sort((a, b) => b.score - a.score);
  }
}
