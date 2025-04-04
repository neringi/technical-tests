import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { MusicService } from './music.service'; 
import { Album } from './album.entity'; 
import { Song } from './song.entity'; 
import { CreateAlbumDto } from './dto/create-album.dto';
import { CreateSongDto } from './dto/create-song.dto';

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

   // Create a new song and associate it with an album
   @Post('albums/:albumId/addsong')
   async createSong(
     @Param('albumId') albumId: number,
     @Body() createSongDto: CreateSongDto
   ) {
     const song = await this.musicService.createSong(albumId, createSongDto);
     if (!song) {
       throw new NotFoundException(`Album with ID ${albumId} not found`);
     }
     return song;
   }
}

