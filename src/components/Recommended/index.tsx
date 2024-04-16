import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../contexts/StateProvider";
import { TVShow, Movie } from "../../types/tmdb.type";
import { Lables } from "../../config/SiteData";
import MovieScroller from "../MovieScroller";
import TvShowScroller from "../TvShowScroller";


export default function Recommended() {
  const [dataType, setDataType] = useState("movies");

  //Recommended Section
  const [recommendedmovies] = useContext(StateContext).recommendedMoviesContext;
  const [recommendedtvshows] = useContext(StateContext).recommendedTvShowsContext;
  const [trendingmovies] = useContext(StateContext).trendingMoviesContext;
  const [dataSource, setDataSource] = useState<Movie[] | TVShow[]>([]);

  useEffect(() => {
    async function getData() {
      switch (dataType) {
        case "movies":
          setDataSource(recommendedmovies);
          break;
        case "shows":
          setDataSource(recommendedtvshows);
          break;
        case "trending":
          setDataSource(trendingmovies);
          break;
        default:
          break;
      }
    }
    getData();
  }, [dataType, recommendedmovies, recommendedtvshows, trendingmovies]);
  const handleClick = (e: any) => {
    setDataType(e.target.dataset.name);
  };
  return (
    <div className="container">
      <section className="bl">
        <div className="heading">
          <h2>{Lables.recommended}</h2>
          <div className="tabs">
            <span className={dataType === "movies" ? "active" : ""} data-name="movies" onClick={handleClick}>
              <i className="fa fa-play-circle"></i> {Lables.movies}
            </span>
            <span className={dataType === "shows" ? "active" : ""} data-name="shows" onClick={handleClick}>
              <i className="fa fa-list"></i> {Lables.tvshows}
            </span>
            <span className={dataType === "trending" ? "active" : ""} data-name="trending" onClick={handleClick}>
              <i className="fa fa-chart-line"></i> {Lables.trending}
            </span>
          </div>
          <div className="clearfix"></div>
        </div>
        {dataType === "shows"
          ? dataSource && <TvShowScroller data={dataSource} category={dataType} />
          : dataSource && <MovieScroller data={dataSource} category={dataType} />}
        <div className="clearfix"></div>
      </section>
    </div>
  )
}
