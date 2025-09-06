const BASE_URL = "https://www.omdbapi.com/"
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || ""

// 🔹 Common fetch wrapper
async function fetchFromOmdb(params) {
  const url = new URL(BASE_URL)
  url.search = new URLSearchParams({ apikey: API_KEY, ...params }).toString()

  const res = await fetch(url)
  if (!res.ok) throw new Error("Network error")

  const data = await res.json()
  if (data.Response === "False") throw new Error(data.Error || "OMDB error")

  return data
}

// 🔹 Search movies
export async function searchMovies({ query, type = "", page = 1 }) {
  const params = { s: query, page: String(page) }
  if (type) params.type = type // movie, series, episode
  return await fetchFromOmdb(params)
}

// 🔹 Movie details
export async function getMovieDetails(imdbID) {
  return await fetchFromOmdb({ i: imdbID, plot: "
