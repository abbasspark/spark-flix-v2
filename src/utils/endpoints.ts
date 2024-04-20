const EndPoints = {
    POPULAR_API_MOVIES: "/movie/popular",

    TRENDING_API_MOVIES_TODAY: "/trending/movie/day",

    TOP_RATED_API_MOVIES: "/movie/top_rated",
    TOP_RATED_API_TVSHOWS: "/tv/top_rated",

    NOW_PLAYING_API_MOVIES: "/movie/now_playing",
    NOW_PLAYING_API_TVSHOWS: "/tv/on_the_air",

    GENRES_API_MOVIES: "/genre/movie/list",

    //TV SHOWS API
    TRENDING_API_TVSHOWS_TODAY: "/trending/tv/day",
    POPULAR_API_TVSHOWS: "/tv/popular",
    GENRES_API_TVSHOWS: "/genre/tv/list",
    //MOVIE INFO API
    MOVIE_INFO_API: (id: string) => `/movie/${id}?append_to_response=credits`,
    //SIMILAR MOVIE API
    SIMILAR_MOVIE_API: (id: string) => `/movie/${id}/similar`,
    //TV INFO API
    TV_INFO_API: (id: string) => `/tv/${id}`,
    //TV INFO API
    TV_SEASON_API: (tv_id: string, season_id: string) => `/tv/${tv_id}/season/${season_id}`,
    //SIMILAR TV API
    SIMILAR_TV_API: (id: string) => `/tv/${id}/similar`,
    //SEARCH API
    SEARCH_MULTI_API: (query: string) => `/search/multi?page=1&include_adult=false&query=${query}`,
    //SEARCH API
    SEARCH_MOVIE_API: (query: string) => `/search/movie?page=1&include_adult=false&query=${query}`,
    //SEARCH API
    SEARCH_TV_API: (query: string) => `/search/tv?page=1&include_adult=false&query=${query}`,
    //DEFAULT API
    DEFAULT_POSTER_PATH: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=738&q=80",

    IMAGE_API: "https://image.tmdb.org/t/p/original",
}

export {
    EndPoints
};