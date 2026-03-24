import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { EventMembersService } from './event-members.service';
import { JoinEventDto } from './dto/join-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventMembersController {
  constructor(private eventMembersService: EventMembersService) {}

  @Post('join')
  join(@Body() dto: JoinEventDto, @Req() req) {
    return this.eventMembersService.joinByCode(dto.inviteCode, req.user.userId);
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string) {
    return this.eventMembersService.getMembers(id);
  }

  @Get(':id/progress')
  getProgress(@Param('id') id: string) {
    return this.eventMembersService.getProgress(id);
  }
}
