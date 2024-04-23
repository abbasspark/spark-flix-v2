import { TheMovieDbService } from '@harshppatel/nestjs-themoviedb-api';
import { Injectable } from '@nestjs/common';
import { Responses } from 'node-themoviedb';

@Injectable()
export class GenreService {
  constructor(private readonly tmdbService: TheMovieDbService) {}

  public async getMovieList(): Promise<Responses.Genre.Common> {
    return await this.tmdbService
      .getGenreEndpoint()
      .getMovieList()
      .then(({ data }) => data);
  }

  public async getTvList(): Promise<Responses.Genre.Common> {
    return await this.tmdbService
      .getGenreEndpoint()
      .getTVList()
      .then(({ data }) => data);
  }
}
