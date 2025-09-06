import React, { createContext, useContext, useEffect, useState } from "react"

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites")
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (movie) => {
    if (!favorites.find((f) => f.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie])
    }
  }

  const removeFavorite = (imdbID) => {
    setFavorites(favorites.filter((f) => f.imdbID !== imdbID))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
