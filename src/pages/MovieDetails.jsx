import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../api/omdb';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
          setError('');
        } else {
          setError(data.Error);
          setMovie(null);
        }
      } catch {
        setError('Failed to fetch movie details.');
        setMovie(null);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p style={{ padding: '1rem' }}>Loading...</p>;
  if (error) return <p style={{ color: 'red', padding: '1rem' }}>{error}</p>;
  if (!movie) return null;

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '2rem' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
        &larr; Back to Search
      </Link>

      <h2>{movie.Title} ({movie.Year})</h2>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.Title}
          style={{ width: '300px', objectFit: 'cover' }}
        />
        <div>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Type:</strong> {movie.Type}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
