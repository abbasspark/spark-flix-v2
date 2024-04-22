import { TheMovieDbService } from '@harshppatel/nestjs-themoviedb-api';
import { Injectable } from '@nestjs/common';
import { Responses } from 'node-themoviedb';

@Injectable()
export class MovieService {
  constructor(private readonly tmdbService: TheMovieDbService) {}

  public async getDetails(movie_id: number): Promise<Responses.Movie.GetDetails> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getDetails({
        pathParameters: {
          movie_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getTranslations(movie_id: number): Promise<Responses.Movie.GetTranslations> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getTranslations({
        pathParameters: {
          movie_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getSimilarMovies(movie_id: number): Promise<Responses.Movie.GetSimilarMovies> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getSimilarMovies({
        pathParameters: {
          movie_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getRecommendations(movie_id: number): Promise<Responses.Movie.GetRecommendations> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getRecommendations({
        pathParameters: {
          movie_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getReviews(movie_id: number): Promise<Responses.Movie.GetReviews> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getReviews({
        pathParameters: {
          movie_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getCredits(movie_id: number): Promise<Responses.Movie.GetCredits> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getCredits({
        pathParameters: {
          movie_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getImages(movie_id: number): Promise<Responses.Movie.GetImages> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getImages({
        pathParameters: {
          movie_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getNowPlaying(page: number = 1): Promise<Responses.Movie.GetNowPlaying> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getNowPlaying({
        query: {
          page,
        },
      })
      .then(({ data }) => data);
  }

  public async getPopular(page: number = 1): Promise<Responses.Movie.GetPopular> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getPopular({
        query: {
          page,
        },
      })
      .then(({ data }) => data);
  }

  public async getUpcoming(page: number = 1): Promise<Responses.Movie.GetUpcoming> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getUpcoming({
        query: {
          page,
        },
      })
      .then(({ data }) => data);
  }

  public async getTopRated(page: number = 1): Promise<Responses.Movie.GetTopRated> {
    return await this.tmdbService
      .getMovieEndpoint()
      .getTopRated({
        query: {
          page,
        },
      })
      .then(({ data }) => data);
  }
}
