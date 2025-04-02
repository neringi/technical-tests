import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  album_name: string;

  @IsNotEmpty()
  artist: string;

  @IsNotEmpty()
  genre: string;

}
