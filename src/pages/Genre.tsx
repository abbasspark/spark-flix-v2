import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import MovieScroller from "../components/MovieScroller";
import Slider from "../components/Slider";
import TvShowScroller from "../components/TvShowScroller";
import { StateContext } from "../contexts/StateProvider";
import { TmdbService } from "../services/tmdb.service";
import Pagination from "../components/Pagination";


export default function Genre() {
    const params = useParams();
    const [movieGenres] = useContext(StateContext).moviesGenresContext;
    const [tvGenres] = useContext(StateContext).tvGenresContext;
    const [page, setPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number | null>();
    const [genreName, setGenreName] = useState<string | undefined>("");
    useEffect(() => {
        function getGenre() {
            console.log({ params });
            if (params.type === "tv") {
                if (tvGenres.length > 0) {
                    let obj = tvGenres.find((x) => x.id.toString() === params.id);
                    setGenreName(obj?.name);
                }
            } else {
                if (movieGenres.length > 0) {
                    let obj = movieGenres.find((x) => x.id.toString() === params.id);
                    setGenreName(obj?.name);
                }
            }
            setPage(1);
        }
        getGenre();
    }, [params, tvGenres, movieGenres]);
    useEffect(() => {
        async function getData() {
            let { results, total_pages } = await TmdbService.discover(params, page);
            setData(results);
            setTotalPages(total_pages);
        }
        getData();
    }, [page, params]);
    const onPageChanged = (pageOfItems: { currentPage: React.SetStateAction<number>; }) => {
        setPage(pageOfItems.currentPage === 0 ? 1 : pageOfItems.currentPage);
    };

    return (
        <div>
            <Slider />
            <div id="genre_container" className="container ">
                <section className="bl">
                    <div className="heading">
                        <h2>{`${genreName}${params.type === "tv" ? " -TV SHOWS" : " -MOVIES"}`}</h2>
                        <div className="clearfix"></div>
                    </div>
                    {params.type === "tv" ? (
                        <TvShowScroller data={data} category={`genre_${params.id}`} />
                    ) : (
                        <MovieScroller data={data} category={`genre_${params.id}`} />
                    )}

                    {totalPages && (
                        <Pagination
                            totalPages={totalPages}
                            totalRecords={totalPages * 20}
                            pageLimit={20}
                            pageNeighbours={1}
                            onPageChanged={onPageChanged}
                        />
                    )}
                </section>
                <div className="clearfix"></div>
            </div>
        </div>
    );
}
