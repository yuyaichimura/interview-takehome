import { Inter } from 'next/font/google';

import { Filters } from '@/types/filters';
import { AIFilter } from '@/components/AIFilter';
import { useContext, useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { useRouter } from 'next/router';
import { MoviesContext } from '@/contexts/MovieContext';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function MovieList() {
  const { allMovies, isLoading } = useContext(MoviesContext);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    let filters: Filters = {};
    if (!isLoading && allMovies.length > 0) {
      filters = {
        ...(query.startYear && { startYear: Number(query.startYear) }),
        ...(query.endYear && { endYear: Number(query.endYear) }),
        ...(query.genres && {
          genres: Array.isArray(query.genres) ? query.genres : (query.genres as string).split(','),
        }),
      };
    }
    const filtered = getFilteredMovies(allMovies, filters);
    setFilteredMovies(filtered);
  }, [allMovies, query, isLoading]);

  const onFilterChange = (filters: Filters) => {
    // Implement me! What should happen when the filters change?
    if (!filters || (!filters.startYear && !filters.endYear && !filters.genres?.length)) {
      router.push('');
      return;
    }
    const queryArr = [];
    if (!!filters.endYear) {
      queryArr.push(`endYear=${filters.endYear}`);
    }
    if (!!filters.startYear) {
      queryArr.push(`startYear=${filters.startYear}`);
    }
    if (filters.genres?.length) {
      queryArr.push(`genres=${filters.genres.join(',')}`);
    }
    if (queryArr.length) {
      router.push(`?${queryArr.join('&')}`);
    }
  };

  const getFilteredMovies = (movies: Movie[] = [], filters: Filters) => {
    const result = movies.filter((movie) => {
      const isMovieInGenre =
        !filters.genres?.length ||
        movie.genres.map((m) => m.toLowerCase()).some((genre) => filters.genres?.includes(genre.toLowerCase()));
      const isMovieInYearRange =
        (!filters.startYear || movie.year >= filters.startYear) && (!filters.endYear || movie.year <= filters.endYear);
      return isMovieInGenre && isMovieInYearRange;
    });
    return result;
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start px-24 py-12 ${inter.className}`}>
      <h1 className="text-4xl font-bold text-center pb-12">Movies!</h1>
      <AIFilter onFilterChange={onFilterChange} />

      <div className="w-full">
        <table className="w-full table-auto">
          <thead className="border-b-2 font-medium border-neutral-400">
            <tr>
              <th className="px-10 py-4 text-left">Title</th>
              <th className="px-10 py-4 text-left">Year</th>
              <th className="px-10 py-4 text-left">Genres</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr className="border-b-2 border-neutral-400" key={movie.slug}>
                <td className="whitespace-nowrap font-medium px-10 py-5 text-left">
                  <Link className="hover:underline" href={`/movies/${movie.slug}`}>
                    {movie.title}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-10 py-5 text-left">{movie.year}</td>
                <td className="whitespace-nowrap px-10 py-5 text-left">{movie.genres.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
