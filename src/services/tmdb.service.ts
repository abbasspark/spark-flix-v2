import { Movie, TVShow, Genre, MultiMedia } from "../types/tmdb.type";
import { fetchData } from "../utils/axios";
import { EndPoints } from "../utils/endpoints";

const TmdbService = {
    popular: {
        movies: async (): Promise<Movie[]> => {
            try {
                const response = await fetchData<{ results: Movie[] }>(EndPoints.POPULAR_API_MOVIES);
                return response.results;
            } catch (error) {
                console.error('Error fetching popular movies:', error);
                return [];
            }
        },
        tvshows: async (): Promise<TVShow[]> => {
            try {
                const response = await fetchData<{ results: TVShow[] }>(EndPoints.POPULAR_API_TVSHOWS);
                return response.results;
            } catch (error) {
                console.error('Error fetching popular tv shows:', error);
                return [];
            }
        }
    },
    trending: {
        movies: async (): Promise<Movie[]> => {
            try {
                const response = await fetchData<{ results: Movie[] }>(EndPoints.TRENDING_API_MOVIES_TODAY);
                return response.results.slice(0, 16);
            } catch (error) {
                console.error('Error fetching trending movies today:', error);
                return [];
            }
        },
        tvshows: async (): Promise<TVShow[]> => {
            try {
                const response = await fetchData<{ results: TVShow[] }>(EndPoints.TRENDING_API_TVSHOWS_TODAY);
                return response.results.slice(0, 16);
            } catch (error) {
                console.error('Error fetching trending tv shows today:', error);
                return [];
            }
        }
    },
    topRated: {
        movies: async (): Promise<Movie[]> => {
            try {
                const response = await fetchData<{ results: Movie[] }>(EndPoints.TOP_RATED_API_MOVIES);
                return response.results;
            } catch (error) {
                console.error('Error fetching trending movies today:', error);
                return [];
            }
        },
        tvshows: async (): Promise<TVShow[]> => {
            try {
                const response = await fetchData<{ results: TVShow[] }>(EndPoints.TOP_RATED_API_TVSHOWS);
                return response.results;
            } catch (error) {
                console.error('Error fetching trending tv shows today:', error);
                return [];
            }
        }
    },
    nowPlaying: {
        movies: async (): Promise<Movie[]> => {
            try {
                const response = await fetchData<{ results: Movie[] }>(EndPoints.NOW_PLAYING_API_MOVIES);
                return response.results.slice(0, 16);
            } catch (error) {
                console.error('Error fetching trending movies today:', error);
                return [];
            }
        },
        tvshows: async (): Promise<TVShow[]> => {
            try {
                const response = await fetchData<{ results: TVShow[] }>(EndPoints.NOW_PLAYING_API_TVSHOWS);
                return response.results.slice(0, 16);
            } catch (error) {
                console.error('Error fetching trending tv shows today:', error);
                return [];
            }
        }
    },
    genre: {
        movies: async (): Promise<Genre[]> => {
            try {
                const response = await fetchData<{ genres: Genre[] }>(EndPoints.GENRES_API_MOVIES);
                return response.genres;
            } catch (error) {
                console.error('Error fetching genre movies:', error);
                return [];
            }
        },
        tvshows: async (): Promise<Genre[]> => {
            try {
                const response = await fetchData<{ genres: Genre[] }>(EndPoints.GENRES_API_TVSHOWS);
                return response.genres;
            } catch (error) {
                console.error('Error fetching genre tv shows:', error);
                return [];
            }
        }
    },
    search: {
        movies: async (query: string): Promise<Movie[]> => {
            try {
                const response = await fetchData<{ results: Movie[] }>(EndPoints.SEARCH_MOVIE_API(query));
                return response.results;
            } catch (error) {
                console.error('Error fetching search movies:', error);
                return [];
            }
        },
        tvshows: async (query: string): Promise<TVShow[]> => {
            try {
                const response = await fetchData<{ results: TVShow[] }>(EndPoints.SEARCH_TV_API(query));
                return response.results;
            } catch (error) {
                console.error('Error fetching search tv shows:', error);
                return [];
            }
        },
        multi: async (query: string, limit = 0): Promise<MultiMedia[]> => {
            try {
                const url = EndPoints.SEARCH_MULTI_API(query);
                console.log("Constructed URL:", url);

                const response = await fetchData<{ results: MultiMedia[] }>(url);

                if (response && response.results) {
                    return limit > 0 ? response.results.slice(0, limit) : response.results;
                } else {
                    console.error('Invalid response format:', response);
                    return [];
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                return [];
            }
        }
    }
}

export { TmdbService };