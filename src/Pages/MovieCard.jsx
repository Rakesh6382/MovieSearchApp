import React from "react"
import { Link } from "react-router-dom"
import { useFavorites } from "../components/FavoritesContext"

export default function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const isFavorite = favorites.some((f) => f.imdbID === movie.imdbID)

  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-2 flex flex-col">
      <Link to={`/movie/${movie.imdbID}`} className="flex-1">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded"
        />
        <h3 className="mt-2 font-semibold">{movie.Title}</h3>
        <p className="text-sm text-gray-600">{movie.Year}</p>
      </Link>

      <button
        onClick={() =>
          isFavorite ? removeFavorite(movie.imdbID) : addFavorite(movie)
        }
        className={`mt-2 px-3 py-1 text-sm rounded text-white ${
          isFavorite ? "bg-red-600" : "bg-blue-600"
        }`}
      >
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>
    </div>
  )
}
