import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicCacheDto } from './dto/create-public-cache.dto';

@Injectable()
export class PublicCachesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePublicCacheDto) {
    return this.prisma.publicCaches.create({ data: dto });
  }

  async findAll() {
    return this.prisma.publicCaches.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const cache = await this.prisma.publicCaches.findUnique({ where: { id } });
    if (!cache) throw new NotFoundException('Cache not found');
    return cache;
  }

  async discover(id: string, userId: string) {
    const cache = await this.prisma.publicCaches.findUnique({ where: { id } });
    if (!cache) throw new NotFoundException('Cache not found');
    if (cache.isAlreadyFound) throw new BadRequestException('Cache already found');

    const [updatedCache] = await this.prisma.$transaction([
      this.prisma.publicCaches.update({
        where: { id },
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
