import React, { createContext, useState, ReactNode } from "react";
import { MultiMedia, Genre, Movie } from "../types/tmdb.type";

interface StateContextType {
    moviesGenresContext: [Genre[], React.Dispatch<React.SetStateAction<Genre[]>>];
    tvGenresContext: [Genre[], React.Dispatch<React.SetStateAction<Genre[]>>];
    searchContext: [MultiMedia[], React.Dispatch<React.SetStateAction<MultiMedia[]>>];
    swiperContext: [Movie[], React.Dispatch<React.SetStateAction<Movie[]>>];
}

export const StateContext = createContext<StateContextType>({
    moviesGenresContext: [[], () => {}],
    tvGenresContext: [[], () => {}],
    searchContext: [[], () => {}],
    swiperContext: [[], () => {}],
});

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
    const [moviesGenres, setMovieGenres] = useState<Genre[]>([]);
    const [tvGenres, setTvGenres] = useState<Genre[]>([]);
    const [search, setSearch] = useState<MultiMedia[]>([]);
    const [swiper, setSwiper] = useState<Movie[]>([]);

    return (
        <StateContext.Provider
            value={{
                moviesGenresContext: [moviesGenres, setMovieGenres],
                tvGenresContext: [tvGenres, setTvGenres],
                searchContext: [search, setSearch],
                swiperContext: [swiper, setSwiper]
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
