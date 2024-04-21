import React, { useEffect, useState } from "react";
import MovieScroller from "../components/MovieScroller";
import MediaPlayer from '../components/Player';
import { TmdbService } from "../services/tmdb.service";
import { Movie } from "../types/tmdb.type";
import { Link, useParams } from "react-router-dom";
import { EndPoints } from "../utils/endpoints";

const MovieDetails = () => {
    const params = useParams();
    const [movieInfo, setMovieInfo] = useState<any>();
    const [movieSimilar, setMovieSimilar] = useState<Movie[]>([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await TmdbService.info.movie.detail(params.id!)
                const director = res.credits.crew.find((x: any) => x.job === 'Director') || undefined;
                const casts = res.credits.cast.slice(0, 4)
                setMovieInfo({
                    name: res.title,
                    poster: `${EndPoints.IMAGE_API}${res.poster_path}`,
                    type: "Movie",
                    reviews: res.vote_count,
                    stars: Math.floor(res.vote_average),
                    runtime: res.runtime,
                    countries: res.production_countries,
                    genres: res.genres,
                    releasDate: res.release_date,
                    overview: res.overview,
                    tags: res.tagline,
                    production: res.production_companies,
                    director,
                    casts,
                    quality: "HD",
                    rating: res.adult ? 18 : 13
                })
                const movieSimilar = await TmdbService.info.movie.similar(params.id!)
                setMovieSimilar(movieSimilar.results)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, [params]);
    return (
        <div className="container watch-page">
            <section className="bl">
                <MediaPlayer />
            </section>
            {movieInfo &&
                < section id="w-info" className="bl">
                    <div className="poster">
                        <img itemProp="image" src={movieInfo.poster} alt="Ghostbusters: Frozen Empire" />
                    </div>
                    <div className="info">
                        <div className="rating-box" data-id="71942" data-score={movieInfo.stars}>
                            <div className="stars">
                                <span className="active">
                                    <i className="bi bi-star-fill">
                                    </i>
                                </span>
                                <span className="active">
                                    <i className="bi bi-star-fill">
                                    </i>
                                </span>
                                <span className="active">
                                    <i className="bi bi-star-fill">
                                    </i>
                                </span>
                                <span className="active">
                                    <i className="bi bi-star-half">
                                    </i>
                                </span>
                                <span className="">
                                    <i className="bi bi-star">
                                    </i>
                                </span>
                            </div>
                            <div className="score live-label">
                                <span>
                                    <b itemProp="ratingValue">{movieInfo.stars}</b> of <b itemProp="bestRating">10</b> (<span itemProp="reviewCount" style={{ display: 'none' }}>{movieInfo.reviews}</span>{movieInfo.reviews} reviews) </span>
                            </div>
                        </div>
                        <h1 itemProp="name" className="name">{movieInfo.name}</h1>
                        <div className="meta">
                            <span className="quality">{movieInfo.quality}</span>
                            <span className="rating">PG-{movieInfo.rating}</span>
                            <span><i className="bi bi-star-fill"></i> {movieInfo.stars}</span>
                            <span className="year">{movieInfo.releasDate.slice(0, 4)}</span>
                            <span>{movieInfo.runtime} min</span>
                        </div>
                        <div className="description cts-wrapper">{movieInfo.overview}</div>
                        <div className="detail">
                            <div>
                                <div>Type:</div>
                                <span>{movieInfo.type}</span>
                            </div>
                            <div>
                                <div>Country:</div>
                                <span>
                                    {movieInfo.countries.map((item: any, index: number) => (<Link to={`/country/${item.iso_3166_1}`}>{`${item.name} ${index < movieInfo.countries.length - 1 ? ',' : ''}`} </Link>))}
                                </span>
                            </div>
                            <div>
                                <div>Genre:</div>
                                <span>
                                    {movieInfo.genres.map((item: any, index: number) => (<Link to={`/genre/movie/${item.id}`}>{`${item.name} ${index < movieInfo.genres.length - 1 ? ',' : ''}`} </Link>))}
                                </span>
                            </div>
                            <div>
                                <div>Release:</div>
                                <span itemProp="dateCreated">{movieInfo.releasDate}</span>
                            </div>
                            <div>
                                <div>Director:</div>
                                <span>
                                    <a itemProp="director" itemType="https://schema.org/Person" href="/director/gil-kenan">
                                        <span itemProp="name">Gil Kenan</span>
                                    </a>
                                </span>
                            </div>
                            <div>
                                <div>Production:</div>
                                <span>
                                    {movieInfo.production.map((item: any, index: number) => (<Link to={`/production/${item.id}`}>{`${item.name} ${index < movieInfo.production.length - 1 ? ',' : ''}`} </Link>))}
                                </span>
                            </div>
                            <div>
                                <div>Cast:</div>
                                <span>
                                    {movieInfo.casts.map((item: any, index: number) => (<Link to={`/cast/${item.id}`}>{`${item.name} ${index < movieInfo.casts.length - 1 ? ',' : ''}`} </Link>))}

                                </span>
                            </div>
                            <div className="tags d-sm-block">
                                <div>Tags:</div>
                                <span>
                                    <h2>{movieInfo.tags}</h2>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>}
            <section className="bl">
                <div className="heading">
                    <h2>{"Similar-Movies"}</h2>
                    <div className="clearfix" />
                </div>
                {movieSimilar && <MovieScroller data={movieSimilar} category="similar" />}
            </section>
        </div>

    );
};

export default MovieDetails;
