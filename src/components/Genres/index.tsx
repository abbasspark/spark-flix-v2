import React from 'react';
import { Genre } from '../../types/tmdb.type';
import { Link } from 'react-router-dom';


interface GenresProps {
    data: Genre[];
    genreType: 'tv' | 'movie';
}

function Genres({ data, genreType }: GenresProps) {
    return (
        <ul>
            {data.length > 0 && data.map((genre) => {
                return (
                    <li key={genre.id}>
                        <Link title={genre.name} to={`/genre/${genreType}/${genre.id}`} >
                            {genre.name}
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
}

export default Genres;
