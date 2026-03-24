import {
  Controller,
  Get,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Patch('profile/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          cb(new Error('Only image files are allowed'), false);
          return;
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  updateProfileImage(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.updateProfileImage(
      req.user.userId,
      `/uploads/${file.filename}`,
    );
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.usersService.getLeaderboard();
  }
}
