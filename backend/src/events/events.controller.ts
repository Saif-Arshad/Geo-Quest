import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body() dto: CreateEventDto, @Req() req) {
    return this.eventsService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Req() req) {
    return this.eventsService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateEventDto>, @Req() req) {
    return this.eventsService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.eventsService.remove(id, req.user.userId);
  }

  @Get(':id/leaderboard')
  getLeaderboard(@Param('id') id: string) {
    return this.eventsService.getLeaderboard(id);
  }
}
