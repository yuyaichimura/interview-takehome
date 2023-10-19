/* import { MoviesContext } from '@/contexts/MovieContext';
import React, { useRouter } from 'next/router';
import { useContext } from 'react';

function MovieDetails() {
  const router = useRouter();
  const { filtere, setMovies } = useContext(MoviesContext);

  return (
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
                  <a className="hover:underline" href={`/movies/${movie.slug}`}>
                    {movie.title}
                  </a>
                </td>
                <td className="whitespace-nowrap px-10 py-5 text-left">{movie.year}</td>
                <td className="whitespace-nowrap px-10 py-5 text-left">{movie.genres.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
 */