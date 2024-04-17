import { Movie, TVShow, Genre, MultiMedia } from "../types/tmdb.type";
import { EndPoints } from "../utils/endpoints";
import { fetch } from "../utils/fetch";
const sliceResults = (res: any) => {
    return {
        ...res,
        results: res.results.slice(0, 16)
    };
};
const TmdbService = {

    popular: {
        movies: fetch<Movie>(EndPoints.POPULAR_API_MOVIES).then(sliceResults),
        tvshows: fetch<TVShow>(EndPoints.POPULAR_API_TVSHOWS).then(sliceResults),
    },
    trending: {
        movies: fetch<Movie>(EndPoints.TRENDING_API_MOVIES_TODAY).then(sliceResults),
        tvshows: fetch<TVShow>(EndPoints.TRENDING_API_TVSHOWS_TODAY).then(sliceResults),
    },
    topRated: {
        movies: async (page: number = 1) => fetch<Movie>(EndPoints.TOP_RATED_API_MOVIES, { page }).then(sliceResults),
        tvshows: async (page: number = 1) => fetch<TVShow>(EndPoints.TOP_RATED_API_TVSHOWS, { page }).then(sliceResults),
    },
    nowPlaying: {
        movies: async (page: number = 1) => fetch<Movie>(EndPoints.NOW_PLAYING_API_MOVIES, { page }).then(sliceResults),
        tvshows: async (page: number = 1) => fetch<TVShow>(EndPoints.NOW_PLAYING_API_TVSHOWS, { page }).then(sliceResults),
    },
    genre: {
        movies: fetch<Genre, 'genres'>(EndPoints.GENRES_API_MOVIES),
        tvshows: fetch<Genre, 'genres'>(EndPoints.GENRES_API_TVSHOWS)
    },

    search: {
        movies: async (query: string) => fetch<Movie>(EndPoints.SEARCH_MOVIE_API(query)),
        tvshows: async (query: string) => fetch<TVShow>(EndPoints.SEARCH_TV_API(query)),
        multi: async (query: string, limit = 0): Promise<MultiMedia[]> => {
            try {
                const url = EndPoints.SEARCH_MULTI_API(query);
                console.log("Constructed URL:", url);
                const { results } = await fetch<MultiMedia>(url)

                if (limit > 0) {
                    return results.slice(0, limit);
                } else {
                    return results;
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                return [];
            }
        }
    },
    discover: async (params: any, page: number) => {
        try {
            let { type, id } = params;
            const url = `/discover/${type}?with_genres=${id}&page=${page}`;
            return sliceResults(await fetch<MultiMedia>(url))
        } catch (error) {
            console.error('Error fetching search results:', error);
            return {
                results: []
            };
        }
    }
}

export { TmdbService };