import React, { useEffect, useState } from "react";
import { Pagination } from "reactstrap";
import MovieScroller from "../components/MovieScroller";
import Slider from "../components/Slider";
import TvShowScroller from "../components/TvShowScroller";
import { Lables } from "../config/SiteData";
import { TmdbService } from "../services/tmdb.service";
import { Movie, TVShow } from "../types/tmdb.type";

interface Title {
    moviesTitle: string;
    tvShowsTitle: string;
}

export default function List() {
    const [page, setPage] = useState<number>(1);
    const [movieData, setMovieData] = useState<Movie[]>([]);
    const [tvData, setTvData] = useState<TVShow[]>([]);
    const [totalPages, setTotalPages] = useState<number | undefined>();
    const [title, setTitle] = useState<Title>({ moviesTitle: "", tvShowsTitle: "" });

    useEffect(() => {
        const fetchTitle = () => {
            let moviesTitle = "";
            let tvShowsTitle = "";
            switch (window.location.pathname) {
                case "/upcoming":
                    moviesTitle = Lables.upcomingmovies;
                    tvShowsTitle = Lables.upcomingtvs;
                    break;
                case "/topimdb":
                    moviesTitle = Lables.topimdbmovies;
                    tvShowsTitle = Lables.topimdbtvs;
                    break;
                default:
                    moviesTitle = Lables.upcomingmovies;
                    tvShowsTitle = Lables.upcomingtvs;
                    break;
            }
            setTitle({ moviesTitle, tvShowsTitle });
        };
        fetchTitle();
    }, []);

    useEffect(() => {
        const fetchList = async (page: number, type: string) => {
            let movie_data;
            let tv_data;
            switch (type) {
                case "/upcoming":
                    movie_data = await TmdbService.nowPlaying.movies(page);
                    tv_data = await TmdbService.nowPlaying.tvshows(page);
                    break;
                case "/topimdb":
                    movie_data = await TmdbService.topRated.movies(page);
                    tv_data = await TmdbService.topRated.tvshows(page);
                    break;
                default:
                    movie_data = await TmdbService.topRated.movies(page);
                    tv_data = await TmdbService.topRated.tvshows(page);
                    break;
            }
            return { movie_data, tv_data };
        };

        const getData = async () => {
            try {
                const { movie_data, tv_data } = await fetchList(page, window.location.pathname);
                setMovieData(movie_data.results);
                setTvData(tv_data.results);
                const maxPages = Math.max(movie_data?.total_pages || 20, tv_data.total_pages || 20);
                setTotalPages(maxPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, [page]);

    const onPageChanged = (pageOfItems: { currentPage: number }) => {
        setPage(pageOfItems.currentPage === 0 ? 1 : pageOfItems.currentPage);
    };

    return (
        <div>
            <Slider />
            <div className="container">
                <section className="bl">
                    <div className="heading">
                        <h2>{title.moviesTitle}</h2>
                        <div className="clearfix"></div>
                    </div>
                    {movieData && <MovieScroller data={movieData} category="topimdbmovie" />}
                    <div className="clearfix"></div>
                </section>
                <section className="bl">
                    <div className="heading">
                        <h2>{title.tvShowsTitle}</h2>
                        <div className="clearfix"></div>
                    </div>
                    {tvData && <TvShowScroller data={tvData} category="topimdbtv" />}
                    <div className="clearfix"></div>
                </section>

                {totalPages && (
                    <Pagination
                        totalPages={totalPages}
                        totalRecords={totalPages * 20}
                        pageLimit={20}
                        pageNeighbours={1}
                        onPageChanged={onPageChanged}
                    />
                )}
            </div>
        </div>
    );
}
