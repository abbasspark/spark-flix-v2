import { TheMovieDbService } from '@harshppatel/nestjs-themoviedb-api';
import { Injectable } from '@nestjs/common';
import { Responses } from 'node-themoviedb';
type Episodes = Record<number, Omit<Omit<Responses.TV.Season.GetDetails['episodes'], 'crew'>, 'guest_stars'>>;
interface GetDetails extends Responses.TV.GetDetails {
  episodes: Episodes;
}
@Injectable()
export class TvService {
  constructor(private readonly tmdbService: TheMovieDbService) {}

  public async getDetails(tv_id: number): Promise<GetDetails> {
    const seriesPromise = this.tmdbService.getTVEndpoint().getDetails({
      pathParameters: {
        tv_id,
      },
    });

    const seriesResponse = await seriesPromise;
    const series = seriesResponse.data;

    const seasonsPromises = series.seasons.map((season) =>
      this.tmdbService.getTVEndpoint().season.getDetails({
        pathParameters: {
          tv_id,
          season_number: season.season_number,
        },
      }),
    );

    const seasonsResponses = await Promise.all(seasonsPromises);
    const episodes = seasonsResponses.reduce((acc, { data: { episodes } }, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      acc[series.seasons[index].season_number] = episodes.map(({ crew, guest_stars, ...rest }) => rest);
      return acc;
    }, {});

    return {
      ...series,
      episodes,
    };
  }

  public async getTranslations(tv_id: number): Promise<Responses.TV.GetTranslations> {
    return await this.tmdbService
      .getTVEndpoint()
      .getTranslations({
        pathParameters: {
          tv_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getSimilarTVShows(tv_id: number): Promise<Responses.TV.GetSimilarTVShows> {
    return await this.tmdbService
      .getTVEndpoint()
      .getSimilarTVShows({
        pathParameters: {
          tv_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getRecommendations(tv_id: number): Promise<Responses.TV.GetRecommendations> {
    return await this.tmdbService
      .getTVEndpoint()
      .getRecommendations({
        pathParameters: {
          tv_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getReviews(tv_id: number): Promise<Responses.TV.GetReviews> {
    return await this.tmdbService
      .getTVEndpoint()
      .getReviews({
        pathParameters: {
          tv_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getCredits(tv_id: number): Promise<Responses.TV.GetCredits> {
    return await this.tmdbService
      .getTVEndpoint()
      .getCredits({
        pathParameters: {
          tv_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getImages(tv_id: number): Promise<Responses.TV.GetImages> {
    return await this.tmdbService
      .getTVEndpoint()
      .getImages({
        pathParameters: {
          tv_id,
        },
      })
      .then(({ data }) => data);
  }

  public async getOnAir(page: number = 1): Promise<Responses.TV.GetOnAir> {
    return await this.tmdbService
      .getTVEndpoint()
      .getOnAir({
        query: {
          page,
        },
      })
      .then(({ data }) => data);
  }

  public async getPopular(page: number = 1): Promise<Responses.TV.GetPopular> {
    return await this.tmdbService
      .getTVEndpoint()
      .getPopular({
        query: {
          page,
        },
      })
      .then(({ data }) => data);
  }

  public async getTopRated(page: number = 1): Promise<Responses.TV.GetTopRated> {
    return await this.tmdbService
      .getTVEndpoint()
      .getTopRated({
        query: {
          page,
        },
      })
      .then(({ data }) => data);
  }
}
