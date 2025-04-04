import { IsNotEmpty } from 'class-validator';

export class CreateSongDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    duration: number; // Duration in seconds
  }
  