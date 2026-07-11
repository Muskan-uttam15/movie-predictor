import pandas as pd
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split

# Global model cache
_model = None
_algo = None

def _train_model(ratings_df):
    """Train the collaborative filtering model and cache it."""
    global _model, _algo
    reader = Reader(rating_scale=(0.5, 5))
    data = Dataset.load_from_df(ratings_df[['userId','movieId','rating']], reader)
    
    trainset = data.build_full_trainset()
    algo = SVD()
    algo.fit(trainset)
    
    _model = ratings_df
    _algo = algo
    return algo

def recommend_by_ratings(ratings_df, user_id, movies_df, top_n=5):
    """Generate movie recommendations using collaborative filtering."""
    global _model, _algo
    
    # Train or load cached model
    if _algo is None or _model is not ratings_df:
        _algo = _train_model(ratings_df)
    
    # Predict ratings for all movies not yet rated by user
    all_movie_ids = ratings_df['movieId'].unique()
    user_movies = ratings_df[ratings_df['userId'] == user_id]['movieId'].tolist()
    unseen_movies = [m for m in all_movie_ids if m not in user_movies]
    
    predictions = [(m, _algo.predict(user_id, m).est) for m in unseen_movies]
    predictions.sort(key=lambda x: x[1], reverse=True)
    
    # Map IDs back to titles
    recommended_ids = [p[0] for p in predictions[:top_n]]
    recommended_titles = movies_df[movies_df['movieId'].isin(recommended_ids)]['title'].tolist()
    
    return recommended_titles
