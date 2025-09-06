const API_KEY = "5ba5ee16";
const BASE_URL = 'https://www.omdbapi.com/';

// Search movies by title, type (movie, series, episode), page
export async function searchMovies(title, type = '', page = 1) {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}${type ? `&type=${type}` : ''}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Get detailed info by IMDb ID
export async function getMovieDetails(id) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
