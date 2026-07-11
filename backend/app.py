from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from recommender.content_based import recommend_by_genre
from recommender.collaborative import recommend_by_ratings

app = Flask(__name__)
CORS(app)

# Global data storage
movies_df = None
ratings_df = None
model_loaded = False

def load_data():
    """Load movie and ratings data."""
    global movies_df, ratings_df, model_loaded
    
    if not model_loaded:
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        movies_df = pd.read_csv(os.path.join(project_root, "data", "movies.csv"))
        ratings_df = pd.read_csv(os.path.join(project_root, "data", "ratings.csv"))
        model_loaded = True
        print(f"Loaded {len(movies_df)} movies and {len(ratings_df)} ratings")

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({"status": "healthy", "message": "Movie Recommender API is running"})

@app.route('/api/movies', methods=['GET'])
def get_movies():
    """Get all movies with pagination."""
    load_data()
    
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    search = request.args.get('search', '')
    
    # Filter by search term if provided
    if search:
        filtered_df = movies_df[movies_df['title'].str.contains(search, case=False, na=False)]
    else:
        filtered_df = movies_df
    
    # Paginate
    start = (page - 1) * limit
    end = start + limit
    paginated_movies = filtered_df.iloc[start:end]
    
    movies = []
    for _, row in paginated_movies.iterrows():
        movies.append({
            'movieId': int(row['movieId']),
            'title': row['title'],
            'genres': row['genres']
        })
    
    return jsonify({
        'movies': movies,
        'total': len(filtered_df),
        'page': page,
        'limit': limit
    })

@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    """Get a specific movie by ID."""
    load_data()
    
    movie = movies_df[movies_df['movieId'] == movie_id]
    if movie.empty:
        return jsonify({"error": "Movie not found"}), 404
    
    return jsonify({
        'movieId': int(movie.iloc[0]['movieId']),
        'title': movie.iloc[0]['title'],
        'genres': movie.iloc[0]['genres']
    })

@app.route('/api/recommend/content-based', methods=['POST'])
def content_based_recommendations():
    """Get content-based recommendations for a movie."""
    load_data()
    
    data = request.json
    movie_title = data.get('movie_title')
    top_n = data.get('top_n', 5)
    
    if not movie_title:
        return jsonify({"error": "movie_title is required"}), 400
    
    try:
        recommendations = recommend_by_genre(movie_title, movies_df, top_n)
        return jsonify({
            'movie_title': movie_title,
            'recommendations': recommendations
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/recommend/collaborative', methods=['POST'])
def collaborative_recommendations():
    """Get collaborative filtering recommendations for a user."""
    load_data()
    
    data = request.json
    user_id = data.get('user_id')
    top_n = data.get('top_n', 5)
    
    if user_id is None:
        return jsonify({"error": "user_id is required"}), 400
    
    try:
        recommendations = recommend_by_ratings(ratings_df, user_id, movies_df, top_n)
        return jsonify({
            'user_id': user_id,
            'recommendations': recommendations
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/genres', methods=['GET'])
def get_genres():
    """Get all unique genres."""
    load_data()
    
    all_genres = set()
    for genres in movies_df['genres']:
        for genre in genres.split('|'):
            all_genres.add(genre)
    
    return jsonify({'genres': sorted(list(all_genres))})

@app.route('/api/movies/genre/<genre>', methods=['GET'])
def get_movies_by_genre(genre):
    """Get movies by genre."""
    load_data()
    
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    
    filtered_df = movies_df[movies_df['genres'].str.contains(genre, case=False, na=False)]
    
    start = (page - 1) * limit
    end = start + limit
    paginated_movies = filtered_df.iloc[start:end]
    
    movies = []
    for _, row in paginated_movies.iterrows():
        movies.append({
            'movieId': int(row['movieId']),
            'title': row['title'],
            'genres': row['genres']
        })
    
    return jsonify({
        'genre': genre,
        'movies': movies,
        'total': len(filtered_df),
        'page': page,
        'limit': limit
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
