import React from 'react'
import { Link } from 'react-router-dom'
import { Film, Users, Sparkles, ArrowRight } from 'lucide-react'

function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Powered by advanced machine learning algorithms, our movie recommender system
          provides personalized suggestions based on your preferences.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/content-based" className="btn-primary flex items-center space-x-2">
            <Film className="h-5 w-5" />
            <span>Try Content-Based</span>
          </Link>
          <Link to="/collaborative" className="btn-secondary flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Try Collaborative</span>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <Film className="h-12 w-12 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Content-Based Filtering</h3>
          <p className="text-gray-400">
            Get recommendations based on movie genres and characteristics. Find movies similar to ones you already love.
          </p>
          <Link to="/content-based" className="mt-4 inline-flex items-center text-primary-400 hover:text-primary-300">
            Try it now <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Collaborative Filtering</h3>
          <p className="text-gray-400">
            Leverage the wisdom of the crowd. Get personalized recommendations based on user ratings and preferences.
          </p>
          <Link to="/collaborative" className="mt-4 inline-flex items-center text-primary-400 hover:text-primary-300">
            Try it now <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-12 w-12 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Smart Algorithms</h3>
          <p className="text-gray-400">
            Powered by TF-IDF, cosine similarity, and SVD algorithms for accurate and diverse recommendations.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Dataset</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-500 mb-2">10,329+</div>
            <div className="text-gray-400">Movies</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-500 mb-2">105,339+</div>
            <div className="text-gray-400">User Ratings</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-500 mb-2">20+</div>
            <div className="text-gray-400">Genres</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
            <div>
              <h4 className="text-lg font-semibold text-white">Choose Your Recommendation Type</h4>
              <p className="text-gray-400">Select between content-based or collaborative filtering based on your preference.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
            <div>
              <h4 className="text-lg font-semibold text-white">Provide Input</h4>
              <p className="text-gray-400">Enter a movie title you like or your user ID for personalized recommendations.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
            <div>
              <h4 className="text-lg font-semibold text-white">Get Recommendations</h4>
              <p className="text-gray-400">Receive a curated list of movies tailored to your preferences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
