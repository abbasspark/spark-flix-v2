import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Footer from './components/Footer';
import { StateContext } from './contexts/StateProvider';
import { TmdbService } from './services/tmdb.service';
import Header from './components/Header';

function App() {
  const {
    moviesGenresContext,
    tvGenresContext,
    swiperContext,
    recommendedMoviesContext,
    recommendedTvShowsContext,
    trendingMoviesContext,
    trendingTvShowsContext
  } = useContext(StateContext);
  const [loading, setLoading] = useState(true);
  const [moviesGenres, setMovieGenres] = moviesGenresContext;
  const [tvGenres, setTvGenres] = tvGenresContext;
  const [, setSwiper] = swiperContext;
  const [, setrRecommendedMovies] = recommendedMoviesContext;
  const [, setRecommendedTvShows] = recommendedTvShowsContext;
  const [, setTrendingMovies] = trendingMoviesContext;
  const [, setTrendingTvShows] = trendingTvShowsContext;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          movieGenresData,
          tvShowGenresData,
          nowPlayingMovies,
          nowPlayingTvShows,
          trendingMovies,
          trendingTvShows,
        ] =
          await Promise.all([
            TmdbService.genre.movies(),
            TmdbService.genre.tvshows(),
            TmdbService.nowPlaying.movies(),
            TmdbService.nowPlaying.tvshows(),
            TmdbService.trending.movies(),
            TmdbService.trending.tvshows(),
          ])

        setMovieGenres(movieGenresData);
        setTvGenres(tvShowGenresData);
        setSwiper(nowPlayingMovies)
        setrRecommendedMovies(nowPlayingMovies)
        setRecommendedTvShows(nowPlayingTvShows)
        setTrendingMovies(trendingMovies)
        setTrendingTvShows(trendingTvShows)
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [
    setMovieGenres,
    setTvGenres,
    setSwiper,
    setLoading,
    setrRecommendedMovies,
    setRecommendedTvShows,
    setTrendingMovies,
    setTrendingTvShows
  ]);

  if (loading || moviesGenres.length === 0 || tvGenres.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div id="body">
        <Header />
        <Routes />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
