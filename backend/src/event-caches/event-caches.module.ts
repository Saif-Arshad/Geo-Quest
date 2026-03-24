import { Module } from '@nestjs/common';
import { EventCachesController } from './event-caches.controller';
import { EventCachesService } from './event-caches.service';

@Module({
  controllers: [EventCachesController],
  providers: [EventCachesService],
})
export class EventCachesModule {}
