import { IsString } from 'class-validator';

export class JoinEventDto {
  @IsString()
  inviteCode: string;
}
