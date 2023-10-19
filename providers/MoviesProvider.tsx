import { useEffect, useState } from 'react';
import { MoviesContext } from '@/contexts/MovieContext';
import { Movie } from '@/types/movie';

export function MoviesProvider({ children }) {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await fetch('/api/movies');
        const movieList = await response.json();
        setAllMovies(movieList);
      } catch (err) {
        console.log(err);
      }
    }
    fetchList();
  }, []);

  return <MoviesContext.Provider value={{allMovies, setAllMovies}}>{children}</MoviesContext.Provider>;
}
