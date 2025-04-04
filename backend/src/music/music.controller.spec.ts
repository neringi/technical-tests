import { Test, TestingModule } from '@nestjs/testing';
import { MusicController } from './music.controller';

describe('MusicController', () => {
  let controller: MusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicController],
    }).compile();

    controller = module.get<MusicController>(MusicController);
  });

  it('to be defined', () => {
    expect(controller).toBeDefined();
  });
});
