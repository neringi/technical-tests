import { Controller, Get } from '@nestjs/common';
import { MusicService } from './music.service'; 
import { Album } from './album.entity'; 
import { Song } from './song.entity'; 

@Controller('music') 
export class MusicController {
  constructor(private readonly musicService: MusicService) {} 

  // Get all albums
  @Get('albums') 
  async getAlbums(): Promise<Album[]> {
    return this.musicService.getAllAlbums(); 
  }

  // Get all songs
  @Get('songs') 
  async getSongs(): Promise<Song[]> {
    return this.musicService.getAllSongs(); 
  }
}