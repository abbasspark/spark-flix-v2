import { Module } from '@nestjs/common';
import { TvService } from './tv.service';
import { TvController } from './tv.controller';
import { TheMovieDb } from '../../commons/tmdb';
import { BaseConfig } from '../../base';

@Module({
  imports: [TheMovieDb.RootAsync()],
  controllers: [TvController],
  providers: [BaseConfig, TvService],
})
export class TvModule {}
