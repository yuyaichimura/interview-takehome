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
  // const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const { allMovies } = useContext(MoviesContext);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const { query } = router;

  /*   useEffect(() => {
    async function fetchList() {
      try {
        const response = await fetch('/api/movies');
        const movieList = await response.json();
        setAllMovies(movieList);
        setFilteredMovies(movieList);
      } catch (err) {
        console.error(err);
        throw new Error('Error fetching movie list');
      }
    }
    fetchList();
  }, []); */

  useEffect(() => {
    let filters: Filters = {};
    if (allMovies.length > 0) {
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
  }, [allMovies, query]);

  const onFilterChange = (filters: Filters) => {
    // Implement me! What should happen when the filters change?
    if (!filters.startYear && !filters.endYear && !filters.genres?.length) {
      router.push('');
      setFilteredMovies(allMovies);
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

  const getFilteredMovies = (movies: Movie[], filters: Filters) => {
    return movies.filter((movie) => {
      const isMovieInGenre = !filters.genres?.length || movie.genres.some((genre) => filters.genres?.includes(genre));
      const isMovieInYearRange =
        (!filters.startYear || movie.year >= filters.startYear) && (!filters.endYear || movie.year <= filters.endYear);
      return isMovieInGenre && isMovieInYearRange;
    });
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start px-24 py-12 ${inter.className}`}>
      <h1 className="text-4xl font-bold text-center pb-12">Movies!</h1>
      <AIFilter onFilterChange={onFilterChange} />

      <div className="w-full">
        <table className="w-full table-auto">
          <thead className="border-b-2 font-medium border-neutral-400">
            <th scope="col" className="px-10 py-4 text-left">
              Title
            </th>
            <th scope="col" className="px-10 py-4 text-left">
              Year
            </th>
            <th scope="col" className="px-10 py-4 text-left">
              Genres
            </th>
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
