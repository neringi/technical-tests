import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Album } from './album.entity';

@Entity({ name: 'song', schema: 'music' })
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Album, (album) => album.songs, { onDelete: 'CASCADE' })
  album: Album;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int'})
  duration: number; // seconds

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_dt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_dt: Date;


}
