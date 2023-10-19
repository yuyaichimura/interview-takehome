import { MoviesContext } from '@/contexts/MovieContext';
import {  useQuery } from 'react-query';

export function MoviesProvider({ children }) {
  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      if (!response.ok) {
        throw new Error('Error during movies fetching');
      }
      return response.json();
    } catch (err) {
      console.error('error fetching', err);
    }
  };

  const { data: allMovies, isLoading, isError, error } = useQuery('allMovies', fetchMovies);

  return (
      <MoviesContext.Provider value={{ allMovies, isLoading, isError, error }}>{children}</MoviesContext.Provider>
  );
}
