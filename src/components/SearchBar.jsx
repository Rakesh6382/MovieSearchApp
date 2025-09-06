import React from 'react';

const SearchBar = ({ query, setQuery, type, setType, onSearch }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch();
      }}
      style={{ marginBottom: '1rem' }}
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        required
        style={{ padding: '8px', width: '60%', marginRight: '1rem' }}
      />
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        style={{ padding: '8px', marginRight: '1rem' }}
      >
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <button type="submit" style={{ padding: '8px 12px' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
