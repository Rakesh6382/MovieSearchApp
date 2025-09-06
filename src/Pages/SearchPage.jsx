import React, { useState } from "react"

export default function SearchBar({ onSearch, type, setType }) {
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) onSearch(input.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search for movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />

      {/* Type filter */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  )
}
