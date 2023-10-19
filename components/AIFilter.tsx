import { FilterResponse, Filters } from '@/types/filters';
import { useEffect, useState } from 'react';

export const AIFilter = ({ onFilterChange }: { onFilterChange: (filters: Filters) => void }) => {
  const [query, setQuery] = useState('');
  const [isFetchingFilter, setIsFetchingFilter] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchFilters = async (query: string) => {
    setIsFetchingFilter(true);
    try {
      const response = await fetch(`/api/ai?query=${query}`);
      if (!response.ok) {
        // Error calling
        console.error(response.status);
        return;
      }
      const responseData = await response.json();
      return responseData;
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingFilter(false);
    }
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }

    const filterResponse = await fetchFilters(query);
    onFilterChange(filterResponse.filters);
  };

  return (
    <div className="w-10/12 mb-12">
      <div>Filter with AI!</div>
      <div className='w-full'>
      <form onSubmit={handleFilterSubmit}>
        <input
          className="min-h-[auto] w-5/6 rounded-lg border-4 px-4 py-2 border-zinc-500 hover:border-sky-600"
          id=" queryInput"
          type="text"
          placeholder="Search query"
          value={query}
          onChange={handleInputChange}
        ></input>
        <button
          type="submit"
          className="min-h-[auto] w-1/12 ml-3 rounded-lg border-4 px-2 py-2 border-zinc-500"
          disabled={isFetchingFilter || !query}
        >
          Go!
        </button>
      </form>
      </div>
    </div>
  );
};
