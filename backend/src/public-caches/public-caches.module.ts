import { Module } from '@nestjs/common';
import { PublicCachesController } from './public-caches.controller';
import { PublicCachesService } from './public-caches.service';

@Module({
  controllers: [PublicCachesController],
  providers: [PublicCachesService],
})
export class PublicCachesModule {}
