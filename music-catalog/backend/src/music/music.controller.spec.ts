import { Test, TestingModule } from '@nestjs/testing';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Song } from './song.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';

describe('MusicController', () => {
  let controller: MusicController;
  let service: MusicService;
  let albumRepo: jest.Mocked<Repository<Album>>;
  let songRepo: jest.Mocked<Repository<Song>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicController], 
      providers: [
        MusicService, 
        {
          provide: getRepositoryToken(Album),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Song),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MusicController>(MusicController);
    service = module.get<MusicService>(MusicService);
    albumRepo = module.get(getRepositoryToken(Album));
    songRepo = module.get(getRepositoryToken(Song));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an album', async () => {
    const albumId = 1;
  const createAlbumDto: CreateAlbumDto = {
    album_name: 'Test Album',
    artist: 'Mock Artist',
    genre: 'Mock Genre',
  };

  const mockAlbum: Album = {
    id: albumId,
    album_name: 'Test Album',
    artist: 'Mock Artist',
    genre: 'Mock Genre',
    created_dt: new Date(),
    updated_dt: new Date(),
    songs: [],
  };

  jest.spyOn(service, 'createAlbum').mockResolvedValue(mockAlbum);

  const result = await controller.createAlbum(createAlbumDto);

  expect(result).toEqual(mockAlbum);
  });


  it('should create a song for an album', async () => {
    const albumId = 1;
    const mockAlbum = { id: albumId, album_name: 'Test Album' } as Album;
    const mockSong = { title: 'Test Song', duration: 123, album: mockAlbum } as Song;

    albumRepo.findOne.mockResolvedValue(mockAlbum);
    songRepo.create.mockReturnValue(mockSong);
    songRepo.save.mockResolvedValue(mockSong);

    const result = await controller.createSong(albumId, {
      title: 'Test Song',
      duration: 123,
    });

    expect(result).toEqual(mockSong);
  });

  it('should return an album by id', async () => {
    const albumId = 1;
    const mockAlbum: Album = {
      id: albumId,
      album_name: 'Test Album',
      artist: 'Mock Artist',
      genre: 'Mock Genre',
      created_dt: new Date(),
      updated_dt: new Date(),
      songs: [],
    };
  
    jest.spyOn(service, 'getAlbumById').mockResolvedValue(mockAlbum);
  
    const result = await controller.getAlbumById(albumId);
  
    expect(result).toEqual(mockAlbum);
  });

  it('should return all albums', async () => {
    const mockAlbums: Album[] = [
      { id: 1, album_name: 'Album 1', artist: 'Artist 1', genre: 'Genre 1', created_dt: new Date(), updated_dt: new Date(), songs: [] },
      { id: 2, album_name: 'Album 2', artist: 'Artist 2', genre: 'Genre 2', created_dt: new Date(), updated_dt: new Date(), songs: [] },
    ];

    jest.spyOn(service, 'getAllAlbums').mockResolvedValue(mockAlbums);

    const result = await controller.getAlbums();
    
    expect(result).toEqual(mockAlbums); 
  });
  
});
