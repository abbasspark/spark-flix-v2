interface Media {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
}

interface Movie extends Media {
    original_title: string;
    release_date: string;
    media_type: "movie"
    adult: boolean;
    video: boolean;
}

interface TVShow extends Media {
    name: string;
    first_air_date: string;
    origin_country: string[];
    media_type: "tv"
}

interface MultiMedia extends Media {
    media_type: "movie" | "tv";
    original_name?: string; // Optional for movies
    name?: string; // Optional for TV shows
    original_language?: string; // Optional
    first_air_date?: string; // Optional for movies
    origin_country?: string[]; // Optional for movies
}

interface Genre {
    id: number;
    name: string;
}

export type {
    Movie,
    TVShow,
    Genre,
    MultiMedia
}