import { TheMovieDbService } from '@harshppatel/nestjs-themoviedb-api';
import { Injectable } from '@nestjs/common';
import { Responses, Arguments } from 'node-themoviedb';
@Injectable()
export class SearchService {
  constructor(private readonly tmdbService: TheMovieDbService) {}

  public async movies(args: Arguments.Search.Movies): Promise<Responses.Search.Movies> {
    return await this.tmdbService
      .getSearchEndpoint()
      .movies(args)
      .then(({ data }) => data);
  }

  public async tvShows(args: Arguments.Search.TVShows): Promise<Responses.Search.TVShows> {
    return await this.tmdbService
      .getSearchEndpoint()
      .TVShows(args)
      .then(({ data }) => data);
  }
  public async multi(args: Arguments.Search.Multi): Promise<Responses.Search.Multi> {
    return await this.tmdbService
      .getSearchEndpoint()
      .multi(args)
      .then(({ data }) => data);
  }
}
