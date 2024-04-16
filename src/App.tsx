import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Footer from './components/Footer';
import { StateContext } from './contexts/StateProvider';
import { TmdbService } from './services/tmdb.service';
import Header from './components/Header';

function App() {
  const { moviesGenresContext, tvGenresContext } = useContext(StateContext);
  const [loading, setLoading] = useState(true);
  const [moviesGenres, setMovieGenres] = moviesGenresContext
  const [tvGenres, setTvGenres] = tvGenresContext
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const movieGenresData = await TmdbService.genre.movies();
        const tvShowGenresData = await TmdbService.genre.tvshows();
        setMovieGenres(movieGenresData);
        setTvGenres(tvShowGenresData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setMovieGenres, setTvGenres]);

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
