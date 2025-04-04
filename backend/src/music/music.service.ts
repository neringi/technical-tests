import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity'; 
import { Song } from './song.entity'; 
import { CreateAlbumDto } from './dto/create-album.dto';
import { CreateSongDto } from './dto/create-song.dto';


@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>, 

    @InjectRepository(Song)  
    private songRepository: Repository<Song>,
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    return await this.albumRepository.find({
      relations: ['songs'], // Ensure that songs are included
      order: { album_name: 'ASC' },
    });
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

  // Get songs for an album
  async getSongsByAlbum(albumId: number): Promise<any> {
    // Fetch the album by ID to ensure it exists
    const album = await this.albumRepository.findOne({
        where: { id: albumId },
      });

    // If album doesn't exist, throw an exception with 404 status
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }

    const songs = await this.songRepository.find({
      where: {
        album: { id: albumId },  
      },
      relations: ['album'],  
      order: { title: 'ASC' }, 
    });

    // If no songs are found, return a "Not found" message
    if (songs.length === 0) {
      return { message: 'No songs found for this album' };
    }

    return songs;
  }


  // Create a song with existing album id
  async createSong(albumId: number, createSongDto: CreateSongDto): Promise<Song | null> {
    const album = await this.albumRepository.findOne({ where: { id: albumId } });

    if (!album) {
        throw new NotFoundException(`Album with ID ${albumId} not found`);
    }

    const song = this.songRepository.create({
      title: createSongDto.title,
      duration: createSongDto.duration,
      album,
    });

    return await this.songRepository.save(song);
  }

  // Delete song by ID
  async deleteSong(songId: number) {
    return await this.songRepository.delete(songId);
  }
}
