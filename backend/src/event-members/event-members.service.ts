import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventMembersService {
  constructor(private prisma: PrismaService) {}

  async joinByCode(inviteCode: string, userId: string) {
    const event = await this.prisma.events.findUnique({
      where: { inviteCode },
    });

    if (!event) throw new NotFoundException('Invalid invite code');

    const existing = await this.prisma.eventMembers.findFirst({
      where: { eventId: event.id, userId },
    });

    if (existing) throw new BadRequestException('Already a member');

    await this.prisma.eventMembers.create({
      data: { eventId: event.id, userId },
    });

    return { message: 'Joined event successfully', eventId: event.id };
  }

  async getMembers(eventId: string) {
    return this.prisma.eventMembers.findMany({
      where: { eventId },
      include: {
        user: {
          select: { id: true, name: true, profileImage: true, experiencePoints: true },
        },
      },
    });
  }

  async getProgress(eventId: string) {
    const members = await this.prisma.eventMembers.findMany({
      where: { eventId },
      include: {
        user: { select: { id: true, name: true, profileImage: true } },
      },
    });

    const caches = await this.prisma.eventCaches.findMany({
      where: { eventId },
      select: { id: true, foundBy: true, experiencePoints: true, isAlreadyFound: true },
    });

    const totalCaches = caches.length;

    return members.map((member) => {
      const found = caches.filter((c) => c.foundBy === member.userId);
      const score = found.reduce((sum, c) => sum + c.experiencePoints, 0);
      return {
        ...member.user,
        cachesFound: found.length,
        totalCaches,
        score,
      };
    });
  }
}
