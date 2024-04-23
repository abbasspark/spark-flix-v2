import { TheMovieDbService } from '@harshppatel/nestjs-themoviedb-api';
import { Injectable } from '@nestjs/common';
import { Responses, Arguments } from 'node-themoviedb';

@Injectable()
export class DiscoverService {
  constructor(private readonly tmdbService: TheMovieDbService) {}

  public async getMovie(args: Arguments.Discover.Movie): Promise<Responses.Discover.Movie> {
    return await this.tmdbService
      .getDiscoverEndpoint()
      .movie(args)
      .then(({ data }) => data);
  }

  public async getTv(args: Arguments.Discover.TV): Promise<Responses.Discover.TV> {
    return await this.tmdbService
      .getDiscoverEndpoint()
      .tv(args)
      .then(({ data }) => data);
  }
}
