import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', width: '200px' }}>
      <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
          alt={movie.Title}
          style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '0.5rem' }}
        />
        <h3 style={{ fontSize: '1rem' }}>{movie.Title}</h3>
        <p style={{ color: '#666' }}>{movie.Year}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
