import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import SearchPage from "./Pages/SearchPage"
import MovieDetails from "./Pages/Favorites"
import { FavoritesProvider } from "./Components/FavoritesContext"
import FavoritesPage from "./Pages/MovieCard"

export default function App() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              🎬 Movies Search
            </Link>
            <nav>
              <Link to="/" className="mr-4">Search</Link>
              <Link to="/favorites">Favorites</Link>
            </nav>
          </div>
        </header>

        {/* Routes */}
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </div>
    </FavoritesProvider>
  )
}
