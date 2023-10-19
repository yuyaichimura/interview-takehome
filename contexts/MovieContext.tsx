import { Movie } from '@/types/movie';
import { createContext } from 'react';

export const MoviesContext = createContext<MoviesListInterface>({
  allMovies: [],
  isError: false,
  isLoading: false,
  error: undefined,
});

interface MoviesListInterface {
  allMovies: Movie[];
  isError?: boolean;
  isLoading?: boolean;
  error?: any;
}
