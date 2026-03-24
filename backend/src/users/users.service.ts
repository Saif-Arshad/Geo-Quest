import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        experiencePoints: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfileImage(userId: string, imageKey: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { profileImage: imageKey },
      select: { id: true, name: true, profileImage: true },
    });
  }

  async getLeaderboard() {
    return this.prisma.user.findMany({
      orderBy: { experiencePoints: 'desc' },
      take: 50,
      select: {
        id: true,
        name: true,
        profileImage: true,
        experiencePoints: true,
      },
    });
  }
}
