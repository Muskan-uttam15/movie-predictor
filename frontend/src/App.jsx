import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Film, Users, Search, Home as HomeIcon } from 'lucide-react'
import Home from './pages/Home'
import ContentBased from './pages/ContentBased'
import Collaborative from './pages/Collaborative'
import MovieList from './pages/MovieList'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        {/* Navigation */}
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <Film className="h-8 w-8 text-primary-500" />
                  <span className="text-xl font-bold text-white">Movie Recommender</span>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-1 text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                  <HomeIcon className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link to="/content-based" className="flex items-center space-x-1 text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                  <Film className="h-5 w-5" />
                  <span>Content-Based</span>
                </Link>
                <Link to="/collaborative" className="flex items-center space-x-1 text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                  <Users className="h-5 w-5" />
                  <span>Collaborative</span>
                </Link>
                <Link to="/movies" className="flex items-center space-x-1 text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                  <Search className="h-5 w-5" />
                  <span>Browse Movies</span>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-white p-2"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-800 border-t border-gray-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/content-based" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Content-Based
                </Link>
                <Link to="/collaborative" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Collaborative
                </Link>
                <Link to="/movies" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Browse Movies
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/content-based" element={<ContentBased />} />
            <Route path="/collaborative" element={<Collaborative />} />
            <Route path="/movies" element={<MovieList />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-400">
              © 2024 Movie Recommender. Built with React, Flask, and Machine Learning.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
