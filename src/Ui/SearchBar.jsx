import React, { useState, useEffect, useCallback } from "react"
import { searchMovies } from "../api/omdb"
import SearchBar from "../ui/SearchBar"
import MovieGrid from "./Favorites"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("") // movie, series, episode
  const [page, setPage] = useState(1)
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const doSearch = useCallback(async (q, t, p = 1) => {
    if (!q) { setResults([]); setTotalResults(0); return }
    setLoading(true); setError("")
    try {
      const data = await searchMovies({ query: q, type: t, page: p })
      setResults(data.Search || [])
      setTotalResults(Number(data.totalResults || 0))
      setPage(p)
    } catch (err) {
      setResults([])
      setTotalResults(0)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!query) return
    doSearch(query, type, 1)
  }, [query, type, doSearch])

  const onSubmit = q => { setQuery(q) }

  const changePage = async (newPage) => {
    if (newPage < 1) return
    setLoading(true)
    try {
      const data = await searchMovies({ query, type, page: newPage })
      setResults(data.Search || [])
      setPage(newPage)
    } catch (err) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div>
      <SearchBar onSearch={onSubmit} type={type} setType={setType} />

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">Error: {error}</div>
      )}

      {!error && !loading && results.length === 0 && query && (
        <div className="mt-4 text-gray-600">No results found for "{query}"</div>
      )}

      {loading && (
        <div className="mt-6 flex justify-center"><div className="loader" /></div>
      )}

      {!loading && results.length > 0 && (
        <>
          <div className="mt-4 text-sm text-gray-600">
            Showing page {page} — {totalResults} results
          </div>
          <MovieGrid movies={results} />

          {/* Pagination */}
          <div className="flex items-center justify-center mt-6 gap-3">
            <button onClick={() => changePage(page - 1)} disabled={page === 1}
              className="px-3 py-1 bg-white border rounded disabled:opacity-50">
              Prev
            </button>
            <div>Page {page} of {Math.ceil(totalResults / 10) || 1}</div>
            <button onClick={() => changePage(page + 1)} disabled={page * 10 >= totalResults}
              className="px-3 py-1 bg-white border rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
