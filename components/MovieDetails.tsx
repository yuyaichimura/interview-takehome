import { MoviesContext } from '@/contexts/MovieContext';
import React, { useRouter } from 'next/router';
import { useContext } from 'react';

export function MovieDetails({movie}) {
  const router = useRouter();
  const { slug } = router.query;



  // const { allMovies } = useContext(MoviesContext);
  // const movie = allMovies.find((movie) => movie.slug === slug);

  return (
    <div>
      <h1>Movie Detail!</h1>
      <div>{movie?.title}</div>
      <div>{movie?.year}</div>
      <div>{movie?.genres.join(', ')}</div>
    </div>
  );
}
