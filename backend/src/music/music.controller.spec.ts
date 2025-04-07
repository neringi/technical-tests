import { Test, TestingModule } from '@nestjs/testing';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Song } from './song.entity';
import { Repository } from 'typeorm';

describe('MusicController', () => {
  let controller: MusicController;
  let service: MusicService;
  let albumRepo: jest.Mocked<Repository<Album>>;
  let songRepo: jest.Mocked<Repository<Song>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicController], // Ensure MusicController is in controllers
      providers: [
        MusicService, // Ensure MusicService is provided
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
});
