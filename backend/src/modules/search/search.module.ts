import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { BaseConfig } from '../../base';
import { TheMovieDb } from '../../commons/tmdb';

@Module({
  imports: [TheMovieDb.RootAsync()],
  controllers: [SearchController],
  providers: [BaseConfig, SearchService],
})
export class SearchModule {}
