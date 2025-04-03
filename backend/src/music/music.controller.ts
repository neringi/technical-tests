import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { MusicService } from './music.service'; 
import { Album } from './album.entity'; 
import { Song } from './song.entity'; 
import { CreateAlbumDto } from './dto/create-album.dto';


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

  // Create an Album
  @Post('albums')
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.musicService.createAlbum(createAlbumDto);
  }

  // Get songs for a specific album
  @Get('albums/:albumId/songs')
  async getSongsByAlbum(@Param('albumId') albumId: number) {
    const songs = await this.musicService.getSongsByAlbum(albumId);
    
    if (songs.message) {
      throw new NotFoundException(songs.message); 
    }
    
    return songs;  // Return songs if found
  }
}

