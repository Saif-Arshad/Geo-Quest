import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreatePublicCacheDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  experiencePoints: number;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
