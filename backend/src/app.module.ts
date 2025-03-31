import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MusicModule } from './music/music.module';
import { Album } from './music/album.entity';
import { Song } from './music/song.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }), 
    MusicModule,
    TypeOrmModule.forFeature([Album, Song])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // Log environment variables to check if they're being loaded correctly
    console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
    console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
    console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
  }
}
