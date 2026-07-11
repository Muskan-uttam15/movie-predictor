import React, { useState } from 'react'
import axios from 'axios'
import { Film, Loader2, AlertCircle } from 'lucide-react'

function ContentBased() {
  const [movieTitle, setMovieTitle] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!movieTitle.trim()) {
      setError('Please enter a movie title')
      return
    }

    setLoading(true)
    setError('')
    setRecommendations([])

    try {
      const response = await axios.post('/api/recommend/content-based', {
        movie_title: movieTitle,
        top_n: 5
      })
      setRecommendations(response.data.recommendations)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <Film className="h-12 w-12 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Content-Based Recommendations</h1>
        <p className="text-gray-400">
          Enter a movie title to find similar movies based on genres and characteristics.
        </p>
      </div>

      <div className="card mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="movieTitle" className="block text-sm font-medium text-gray-300 mb-2">
              Movie Title
            </label>
            <input
              type="text"
              id="movieTitle"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              placeholder="e.g., Toy Story (1995)"
              className="input-field w-full"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Getting Recommendations...
              </span>
            ) : (
              'Get Recommendations'
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="card bg-red-900/20 border-red-700 mb-8">
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recommendations for "{movieTitle}"
          </h2>
          <div className="space-y-3">
            {recommendations.map((movie, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{movie}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 card">
        <h3 className="text-lg font-semibold text-white mb-3">Popular Movies to Try</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Toy Story (1995)', 'Jumanji (1995)', 'Grumpier Old Men (1995)', 'Heat (1995)'].map((movie) => (
            <button
              key={movie}
              onClick={() => setMovieTitle(movie)}
              className="text-left px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors text-sm text-gray-300"
            >
              {movie}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContentBased
