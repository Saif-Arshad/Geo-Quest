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
import { PublicCachesService } from './public-caches.service';
import { CreatePublicCacheDto } from './dto/create-public-cache.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('public-caches')
export class PublicCachesController {
  constructor(private publicCachesService: PublicCachesService) {}

  @Post()
  create(@Body() dto: CreatePublicCacheDto) {
    return this.publicCachesService.create(dto);
  }

  @Get()
  findAll() {
    return this.publicCachesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicCachesService.findOne(id);
  }

  @Patch(':id/discover')
  discover(@Param('id') id: string, @Req() req) {
    return this.publicCachesService.discover(id, req.user.userId);
  }
}
