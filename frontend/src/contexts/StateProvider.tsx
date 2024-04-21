import React, { createContext, useState, ReactNode } from "react";
import { MultiMedia, Genre, Movie, TVShow } from "../types/tmdb.type";

interface StateContextType {
    moviesGenresContext: [Genre[], React.Dispatch<React.SetStateAction<Genre[]>>];
    tvGenresContext: [Genre[], React.Dispatch<React.SetStateAction<Genre[]>>];
    searchContext: [MultiMedia[], React.Dispatch<React.SetStateAction<MultiMedia[]>>];
    swiperContext: [Movie[], React.Dispatch<React.SetStateAction<Movie[]>>];
    recommendedMoviesContext: [Movie[], React.Dispatch<React.SetStateAction<Movie[]>>];
    recommendedTvShowsContext: [TVShow[], React.Dispatch<React.SetStateAction<TVShow[]>>];
    trendingMoviesContext: [Movie[], React.Dispatch<React.SetStateAction<Movie[]>>];
    trendingTvShowsContext: [TVShow[], React.Dispatch<React.SetStateAction<TVShow[]>>];
    topRatedMoviesContext: [Movie[], React.Dispatch<React.SetStateAction<Movie[]>>];
    topRatedTvShowsContext: [TVShow[], React.Dispatch<React.SetStateAction<TVShow[]>>];
}

export const StateContext = createContext<StateContextType>({
    moviesGenresContext: [[], () => {}],
    tvGenresContext: [[], () => {}],
    searchContext: [[], () => {}],
    swiperContext: [[], () => {}],
    recommendedMoviesContext: [[], () => {}],
    recommendedTvShowsContext: [[], () => {}],
    trendingMoviesContext: [[], () => {}],
    trendingTvShowsContext: [[], () => {}],
    topRatedMoviesContext: [[], () => {}],
    topRatedTvShowsContext: [[], () => {}],
});

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
    const [moviesGenres, setMovieGenres] = useState<Genre[]>([]);
    const [tvGenres, setTvGenres] = useState<Genre[]>([]);
    const [search, setSearch] = useState<MultiMedia[]>([]);
    const [swiper, setSwiper] = useState<Movie[]>([]);
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    const [recommendedTvShows, setRecommendedTvShows] = useState<TVShow[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [trendingTvShows, setTrendingTvShows] = useState<TVShow[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState<TVShow[]>([]);

    return (
        <StateContext.Provider
            value={{
                moviesGenresContext: [moviesGenres, setMovieGenres],
                tvGenresContext: [tvGenres, setTvGenres],
                searchContext: [search, setSearch],
                swiperContext: [swiper, setSwiper],
                recommendedMoviesContext: [recommendedMovies, setRecommendedMovies],
                recommendedTvShowsContext: [recommendedTvShows, setRecommendedTvShows],
                trendingMoviesContext: [trendingMovies, setTrendingMovies],
                trendingTvShowsContext: [trendingTvShows, setTrendingTvShows],
                topRatedMoviesContext: [topRatedMovies, setTopRatedMovies],
                topRatedTvShowsContext: [topRatedTvShows, setTopRatedTvShows],
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
