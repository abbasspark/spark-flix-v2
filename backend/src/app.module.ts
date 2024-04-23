import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'node:path';
import { BaseConfig } from './base';
import { MovieModule } from './modules/movie/movie.module';
import { TvModule } from './modules/tv/tv.module';
import { DiscoverModule } from './modules/discover/discover.module';
import { GenreModule } from './modules/genre/genre.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(process.cwd(), '.env'),
    }),
    HttpModule,
    MovieModule,
    TvModule,
    DiscoverModule,
    GenreModule,
    SearchModule,
  ],
  providers: [BaseConfig],
})
export class AppModule {}
