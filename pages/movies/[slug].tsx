import { MoviesContext } from '@/contexts/MovieContext';
import React, { useRouter } from 'next/router';
import { useContext } from 'react';

export default function MovieDetails({}) {
  const router = useRouter();
  const { slug } = router.query;
  const { allMovies } = useContext(MoviesContext);
  const movie = allMovies.find((movie) => movie.slug === slug);

  return (
    <div className={'flex min-h-screen flex-col items-center justify-start px-24 py-12'}>
      <div>
      <h1 className="text-4xl font-bold text-center pb-12">Movie Detail!</h1>
      </div>
      <div className='w-full grid  grid-cols-2  gap-22 place-items-center'>
        <div className="flex-shrink-0 mr-6">
          <img className="object-cover" src={movie?.thumbnail} alt={movie?.title}/>
        </div>
        <div className="flex-auto px-10">
            <h2 className='text-3xl font-bold' >{movie?.title}</h2>
            <h2 className='text-xl' >{movie?.year}</h2>
            <h2 className='text-xl' >{movie?.genres.join(', ')}</h2>
        </div>
      </div>
    </div>
  );
}
