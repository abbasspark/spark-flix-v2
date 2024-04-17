import React, { useContext } from "react";
import { StateContext } from "../../contexts/StateProvider";
import { Lables } from "../../config/SiteData";
import MovieScroller from "../MovieScroller";
import TvShowScroller from "../TvShowScroller";


export default function Latest() {
  const [nowPlayingMovies] = useContext(StateContext).recommendedMoviesContext;
  const [populartv] = useContext(StateContext).recommendedTvShowsContext;

  return (
    <div className="container">
      <section className="bl">
        <div className="heading">
          <h2>{Lables.latestmovies}</h2>
          <div className="clearfix"></div>
        </div>
        {nowPlayingMovies && <MovieScroller data={nowPlayingMovies} category="latest" />}
        <div className="clearfix"></div>
      </section>
      <section className="bl">
        <div className="heading">
          <h2>{Lables.latesttvshows}</h2>
          <div className="clearfix"></div>
        </div>
        {populartv && <TvShowScroller data={populartv} category="latesttvshows" />}
      </section>
    </div>
  )
}
