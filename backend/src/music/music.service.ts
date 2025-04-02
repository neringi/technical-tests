import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity'; 
import { Song } from './song.entity'; 
import { CreateAlbumDto } from './dto/create-album.dto';


@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>, 

    @InjectRepository(Song)  
    private songRepository: Repository<Song>,
  ) {}

  // Fetch all albums
  async getAllAlbums(): Promise<Album[]> {
    try {
      return await this.albumRepository.find();
    } catch (error) {
      console.error('Error fetching albums:', error);
      throw new Error('Failed to fetch albums'); 
    }
  }

  // Fetch all songs
  async getAllSongs(): Promise<Song[]> {
    try {
      return await this.songRepository.find({ relations: ['album'] }); 
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw new Error('Failed to fetch songs');
    }
  }
  
  // Create a new album
  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(album);
  }
}
