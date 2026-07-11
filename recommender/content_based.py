import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_by_genre(movie_title, movies_df, top_n=5):
    # Convert genres into TF-IDF features
    tfidf = TfidfVectorizer(token_pattern='[a-zA-Z0-9]+')
    tfidf_matrix = tfidf.fit_transform(movies_df['genres'])
    
    # Compute similarity
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # Get index of the movie
    matching_movies = movies_df[movies_df['title'] == movie_title]
    if matching_movies.empty:
        raise ValueError(f"Movie '{movie_title}' not found in the database. Please check the spelling or try a different movie title.")
    
    idx = matching_movies.index[0]
    
    # Get similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Top N recommendations
    sim_indices = [i[0] for i in sim_scores[1:top_n+1]]
    return movies_df.iloc[sim_indices]['title'].tolist()
