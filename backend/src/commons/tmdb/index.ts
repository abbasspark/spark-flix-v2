import { TheMovieDbModule } from '@harshppatel/nestjs-themoviedb-api';
import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BaseConfig } from '../../base';

@Injectable()
export class TheMovieDb {
  static RootAsync() {
    return TheMovieDbModule.forAsyncRoot({
      imports: [ConfigModule],
      useFactory: (configService: BaseConfig = new BaseConfig()) => {
        return {
          API_KEY: configService.get('TMDB_API_KEY'),
          language: configService.get('TMDB_LANGUAGE'),
        };
      },
    });
  }
}
