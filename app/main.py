import pandas as pd
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from recommender.content_based import recommend_by_genre
from recommender.collaborative import recommend_by_ratings

# Get the project root directory
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load actual data
movies_df = pd.read_csv(os.path.join(project_root, "data", "movies.csv"))
ratings_df = pd.read_csv(os.path.join(project_root, "data", "ratings.csv"))

print("Loaded movies dataset:")
print(movies_df.head())
print(f"\nTotal movies: {len(movies_df)}")
print(f"Total ratings: {len(ratings_df)}")

print("\nContent-based recommendations for 'Toy Story (1995)':")
print(recommend_by_genre("Toy Story (1995)", movies_df))

print("\nCollaborative recommendations for user 1:")
print(recommend_by_ratings(ratings_df, user_id=1, movies_df=movies_df))
