import { Module } from '@nestjs/common';
import { DiscoverService } from './discover.service';
import { DiscoverController } from './discover.controller';
import { BaseConfig } from '../../base';
import { TheMovieDb } from '../../commons/tmdb';

@Module({
  imports: [TheMovieDb.RootAsync()],
  controllers: [DiscoverController],
  providers: [BaseConfig, DiscoverService],
})
export class DiscoverModule {}
