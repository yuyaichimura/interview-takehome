import { Movie } from '@/types/movie';
import { createContext } from 'react';

export const MoviesContext = createContext<MoviesListInterface>({
  allMovies: [],
  setAllMovies: (movies: Movie[]) => {},
});

interface MoviesListInterface {
  allMovies: Movie[];
  setAllMovies: (movies: Movie[]) => void;
}
