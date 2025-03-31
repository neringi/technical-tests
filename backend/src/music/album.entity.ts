import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from 'typeorm';
import { Song } from './song.entity';

@Entity({ name: 'album', schema: 'music' })
@Unique(["artist", "album_name"]) // need to have unique artist and album name - purposeful design decision for now that does not handle edge cases like rereleases  
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  album_name: string;

  @Column({ type: 'varchar', length: 255 })
  artist: string;

  @Column({ type: 'varchar', length: 255 })
  genre: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_dt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_dt: Date;

  @OneToMany(() => Song, (song) => song.album, { cascade: true })
  songs: Song[];
}
