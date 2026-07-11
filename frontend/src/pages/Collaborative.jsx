import React, { useState } from 'react'
import axios from 'axios'
import { Users, Loader2, AlertCircle } from 'lucide-react'

function Collaborative() {
  const [userId, setUserId] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userId.trim()) {
      setError('Please enter a user ID')
      return
    }

    setLoading(true)
    setError('')
    setRecommendations([])

    try {
      const response = await axios.post('/api/recommend/collaborative', {
        user_id: parseInt(userId),
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
        <Users className="h-12 w-12 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Collaborative Filtering Recommendations</h1>
        <p className="text-gray-400">
          Enter your user ID to get personalized movie recommendations based on ratings from similar users.
        </p>
      </div>

      <div className="card mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-300 mb-2">
              User ID
            </label>
            <input
              type="number"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g., 1"
              min="1"
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
            Recommendations for User {userId}
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
        <h3 className="text-lg font-semibold text-white mb-3">How It Works</h3>
        <div className="space-y-3 text-gray-400">
          <p>
            Collaborative filtering uses the SVD (Singular Value Decomposition) algorithm to analyze
            user ratings and find patterns in user preferences.
          </p>
          <p>
            The system identifies users with similar rating patterns and recommends movies that
            those similar users have rated highly.
          </p>
          <p className="text-sm">
            <strong>Note:</strong> User IDs in our dataset range from 1 to 671. Try entering any ID in this range.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Collaborative
