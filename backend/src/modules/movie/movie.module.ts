import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { BaseConfig } from '../../base';
import { TheMovieDb } from '../../commons/tmdb';

@Module({
  imports: [TheMovieDb.RootAsync()],
  controllers: [MovieController],
  providers: [BaseConfig, MovieService],
})
export class MovieModule {}
