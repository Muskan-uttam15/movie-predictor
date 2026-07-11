import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Search, Film, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const limit = 20

  const fetchMovies = async (currentPage = 1, search = '') => {
    setLoading(true)
    setError('')
    try {
      const params = { page: currentPage, limit }
      if (search) params.search = search
      
      const response = await axios.get('/api/movies', { params })
      setMovies(response.data.movies)
      setTotal(response.data.total)
      setPage(response.data.page)
    } catch (err) {
      setError('Failed to load movies. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(page, searchTerm)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchMovies(1, searchTerm)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    fetchMovies(newPage, searchTerm)
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div>
      <div className="text-center mb-8">
        <Film className="h-12 w-12 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Browse Movies</h1>
        <p className="text-gray-400">
          Explore our collection of {total} movies
        </p>
      </div>

      {/* Search Bar */}
      <div className="card mb-8">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movies by title..."
              className="input-field w-full"
            />
          </div>
          <button type="submit" className="btn-primary flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {error && (
        <div className="card bg-red-900/20 border-red-700 mb-8">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* Movies Grid */}
          <div className="grid gap-4 mb-8">
            {movies.map((movie) => (
              <div
                key={movie.movieId}
                className="card hover:bg-gray-750 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{movie.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.split('|').map((genre, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm ml-4">
                    ID: {movie.movieId}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between card">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>

              <div className="text-gray-400">
                Page {page} of {totalPages}
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {movies.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-400">
              No movies found. Try a different search term.
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MovieList
