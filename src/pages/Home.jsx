import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { searchMovies } from '../api/omdb';

const Home = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await searchMovies(query, type, page);
      console.log('this is the dat afrom the search API', data);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setError(data.Error);
        setMovies([]);
        setTotalResults(0);
      }
    } catch (e) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
      setTotalResults(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // When user searches or changes type, reset to page 1
  const onSearch = () => {
    setPage(1);
    fetchMovies();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <h1>Movies Search App</h1>
      <SearchBar query={query} setQuery={setQuery} type={type} setType={setType} onSearch={onSearch} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* {!loading && !error && movies.length === 0 && <p>No results found.</p>} */}
      {movies.length === 0 && <i>Please search for movies.</i>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      <Pagination currentPage={page} totalResults={totalResults} onPageChange={setPage} />
    </div>
  );
};

export default Home;
