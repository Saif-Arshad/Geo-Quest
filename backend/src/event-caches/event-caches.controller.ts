import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventCachesService } from './event-caches.service';
import { CreateEventCacheDto } from './dto/create-event-cache.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('events/:eventId/caches')
export class EventCachesController {
  constructor(private eventCachesService: EventCachesService) {}

  @Post()
  create(
    @Param('eventId') eventId: string,
    @Body() dto: CreateEventCacheDto,
    @Req() req,
  ) {
    return this.eventCachesService.create(eventId, dto, req.user.userId);
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.eventCachesService.findAll(eventId);
  }

  @Patch(':id/discover')
  discover(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.eventCachesService.discover(eventId, id, req.user.userId);
  }
}
