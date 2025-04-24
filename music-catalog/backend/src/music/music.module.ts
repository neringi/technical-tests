import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Song } from './song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Song])],
  providers: [MusicService],
  controllers: [MusicController]
})
export class MusicModule {}
