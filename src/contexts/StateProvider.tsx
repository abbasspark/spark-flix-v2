import React, { createContext, useState, ReactNode } from "react";
import { MultiMedia, Genre } from "../types/tmdb.type";

interface StateContextType {
    moviesGenresContext: [Genre[], React.Dispatch<React.SetStateAction<Genre[]>>];
    tvGenresContext: [Genre[], React.Dispatch<React.SetStateAction<Genre[]>>];
    searchContext: [MultiMedia[], React.Dispatch<React.SetStateAction<MultiMedia[]>>];
}

export const StateContext = createContext<StateContextType>({
    moviesGenresContext: [[], () => {}],
    tvGenresContext: [[], () => {}],
    searchContext: [[], () => {}],
});

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
    const [moviesGenres, setMovieGenres] = useState<Genre[]>([]);
    const [tvGenres, setTvGenres] = useState<Genre[]>([]);
    const [search, setSearch] = useState<MultiMedia[]>([]);

    return (
        <StateContext.Provider
            value={{
                moviesGenresContext: [moviesGenres, setMovieGenres],
                tvGenresContext: [tvGenres, setTvGenres],
                searchContext: [search, setSearch],
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
