import { IsDateString, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
