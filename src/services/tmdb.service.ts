import { Movie, TVShow, Genre, MultiMedia } from "../types/tmdb.type";
import { fetchData } from "../utils/axios";
import { EndPoints } from "../utils/endpoints";

type ApiResponse<T, K extends string = 'results'> = {
    [key in K]: T[];
} & {
    total_pages?: number;
};
const fetch = async<T, K extends string = 'results'>(endpoint: string, queryParams: Record<string, any> = {}): Promise<ApiResponse<T, K>> => {
    try {
        return await fetchData<ApiResponse<T, K>>(endpoint, queryParams);
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return {
            results: []
        } as ApiResponse<T, K>;
    }
};

const TmdbService = {

    popular: {
        movies: fetch<Movie>(EndPoints.POPULAR_API_MOVIES),
        tvshows: fetch<TVShow>(EndPoints.POPULAR_API_TVSHOWS),
    },
    trending: {
        movies: fetch<Movie>(EndPoints.TRENDING_API_MOVIES_TODAY),
        tvshows: fetch<TVShow>(EndPoints.TRENDING_API_TVSHOWS_TODAY),
    },
    topRated: {
        movies: async (page: number = 1): Promise<ApiResponse<Movie>> => fetch<Movie>(EndPoints.TOP_RATED_API_MOVIES, { page }),
        tvshows: async (page: number = 1): Promise<ApiResponse<TVShow>> => fetch<TVShow>(EndPoints.TOP_RATED_API_TVSHOWS, { page }),
    },
    nowPlaying: {
        movies: async (page: number = 1): Promise<ApiResponse<Movie>> => fetch<Movie>(EndPoints.NOW_PLAYING_API_MOVIES, { page }),
        tvshows: async (page: number = 1): Promise<ApiResponse<TVShow>> => fetch<TVShow>(EndPoints.NOW_PLAYING_API_TVSHOWS, { page }),
    },
    genre: {
        movies: fetch<Genre, 'genres'>(EndPoints.GENRES_API_MOVIES),
        tvshows: fetch<Genre, 'genres'>(EndPoints.GENRES_API_TVSHOWS)
    },

    search: {
        movies: async (query: string): Promise<ApiResponse<Movie>> => fetch<Movie>(EndPoints.SEARCH_MOVIE_API(query)),
        tvshows: async (query: string): Promise<ApiResponse<TVShow>> => fetch<TVShow>(EndPoints.SEARCH_TV_API(query)),
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
            return await fetch<MultiMedia>(url)
        } catch (error) {
            console.error('Error fetching search results:', error);
            return {
                results: []
            };
        }
    }
}

export { TmdbService };