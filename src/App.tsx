import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Footer from './components/Footer';
import { StateContext } from './contexts/StateProvider';
import { TmdbService } from './services/tmdb.service';
import Header from './components/Header';

function App() {
  const { moviesGenresContext, tvGenresContext, swiperContext } = useContext(StateContext);
  const [loading, setLoading] = useState(true);
  const [moviesGenres, setMovieGenres] = moviesGenresContext;
  const [tvGenres, setTvGenres] = tvGenresContext;
  const [swiper, setSwiper] = swiperContext;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          movieGenresData,
          tvShowGenresData,
          nowPlayingMovies
        ] =
          await Promise.all([
            TmdbService.genre.movies(),
            TmdbService.genre.tvshows(),
            TmdbService.nowPlaying.movies(),
          ])

        setMovieGenres(movieGenresData);
        setTvGenres(tvShowGenresData);
        setSwiper(nowPlayingMovies)
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [setMovieGenres, setTvGenres, setSwiper, setLoading]);

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
