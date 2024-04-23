import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { BaseConfig } from '../../base';
import { TheMovieDb } from '../../commons/tmdb';

@Module({
  imports: [TheMovieDb.RootAsync()],
  controllers: [GenreController],
  providers: [BaseConfig, GenreService],
})
export class GenreModule {}
