import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from lightfm import LightFM
from lightfm.data import Dataset
import numpy as np
from RatingService import RatingService
from TagsService import TagsService
from MovieService import MovieService

class RecommendationService:
    def __init__(self):
        # Instantiate RatingService, TagsService, and MovieService classes
        # to access movie data, user ratings, and movie tags.
        self.rating_service = RatingService()
        self.tags_service = TagsService()
        self.movie_service = MovieService()

        # Create a Dataset object and populate it with movie data.
        self.dataset = Dataset()
        self._prepare_data()

        # Instantiate a LightFM model using the 'warp' loss function,
        # which optimizes for rank-based recommendations.
        self.model = LightFM(loss='warp')

        # Train the LightFM model with the prepared data.
        self.train()
        
    def _prepare_data(self):
        # Fetch movie, ratings, and tags data from the respective services.
        self.movies = self.movie_service.get_all_movies()
        self.ratings = self.rating_service.get_all_ratings()
        self.tags = self.tags_service.get_all_tags()

        # Fit the dataset with unique users, movie IDs, and tags to
        # create a sparse matrix representing users and items.
        self.dataset.fit(users=self.ratings["wallet_address"].unique(),
                         items=self.movies["id"].unique(),
                         item_features=self.tags["tag"].unique())

        # Build user-item interactions and weights matrices by iterating
        # over the ratings data, and creating a tuple of user ID, movie ID, and rating.
        self.interactions, self.weights = self.dataset.build_interactions(((row["wallet_address"], row["movie_id"], row["rating"])
                                                                           for _, row in self.ratings.iterrows()))

        # Build item features matrix by iterating over the tags data
        # and creating a tuple of movie ID and its associated tag.
        self.item_features = self.dataset.build_item_features(((row["movie_id"], [row["tag"]])
                                                                for _, row in self.tags.iterrows()))
    
    def train(self):
        # Train the LightFM model using the interactions and item features matrices,
        # with 30 training epochs and 4 parallel threads for performance.
        self.model.fit(self.interactions, item_features=self.item_features, epochs=30, num_threads=4)

    def update_model(self):
        """
        Update the model with new data by re-preparing the data
        and retraining the LightFM model.
        """
        self._prepare_data()
        self.train()

    def _prepare_combined_features(self):
        # Combine all the desired features into a single string for each movie
        self.movies['combined_features'] = self.movies.apply(
            lambda x: ' '.join(
                [
                    str(x['overview']),
                    str(x['budget']),
                    str(x['release_date']),
                    str(x['status']),
                    ' '.join([name for name in x['genres']]),
                    str(x['tagline']),
                    str(x['original_language']),
                    str(x['vote_average']),
                    str(x['vote_count']),
                    str(x['popularity']),
                    ' '.join([name for name in x['production_countries']])
                ]
            ), axis=1
        )
        self.movies['combined_features'] = self.movies['combined_features'].fillna('')

    def _content_based_filtering(self):
        # Call the method to prepare combined features for each movie
        self._prepare_combined_features()

        # Instantiate a TfidfVectorizer with English stop words to transform
        # the combined features into a term frequency-inverse document frequency (TF-IDF) matrix.
        tfidf = TfidfVectorizer(stop_words='english')

        # Compute the TF-IDF matrix for the combined features.
        matrix = tfidf.fit_transform(self.movies['combined_features'])

        # Calculate the cosine similarity between each pair of movies
        # in the TF-IDF matrix, resulting in a similarity matrix.
        cosine_sim = cosine_similarity(matrix, matrix)

        # Create a pandas Series mapping movie IDs to their respective indices
        # in the similarity matrix for easy lookup.
        indices = pd.Series(self.movies.index, index=self.movies['id']).drop_duplicates()

        return indices, cosine_sim
    
    def _get_content_based_recommendations(self, movie_id, indices, cosine_sim, limit):
        # Retrieve the similarity matrix index for the specified movie.
        index = indices[movie_id]

        # Calculate the cosine similarity between the given movie and all other movies,
        # generating a list of tuples with movie index and similarity score.
        sim_scores = list(enumerate(cosine_sim[index]))

        # Sort the list of tuples by similarity score in descending order,
        # so the most similar movies appear first.
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Select the top 'limit' similar movies, excluding the first one (itself).
        sim_scores = sim_scores[1:limit+1]
        movie_indices = [i[0] for i in sim_scores]

        # Map the selected movie indices to their corresponding movie IDs.
        return self.movies['id'].iloc[movie_indices].tolist()

    def get_recommendations(self, wallet_address: str, limit: int) -> list:
        if wallet_address is not None:
            # Collaborative filtering: Use the trained LightFM model to predict
            # user-item interaction scores for all items in the dataset.
            scores = self.model.predict(wallet_address, np.arange(self.dataset.interactions_shape()[1]), item_features=self.item_features)

            # Select the top 'limit//2' items with the highest predicted scores.
            top_items = np.argsort(-scores)[:limit//2]

            # Map the selected item indices to their corresponding movie IDs.
            collaborative_recommendations = [self.dataset.mapping()[3][item] for item in top_items]

            # Content-based filtering: Identify the highest-rated movie for the user.
            movie_id = self.ratings[self.ratings['wallet_address'] == wallet_address].sort_values('rating', ascending=False).iloc[0]['movie_id']

            # Compute content-based recommendations using the highest-rated movie, indices, and cosine similarity.
            indices, cosine_sim = self._content_based_filtering()
            content_recommendations = self._get_content_based_recommendations(movie_id, indices, cosine_sim, limit//2)

            # Combine the collaborative and content-based recommendations into a single list.
            recommendations = collaborative_recommendations + content_recommendations

            # Return the list of recommended movie IDs.
            return recommendations

        else:
            # Content-based filtering for users without a wallet_address:
            # Choose a random movie from the dataset as a starting point.
            random_movie_id = self.movies['id'].sample().values[0]

            # Compute content-based recommendations using the random movie, indices, and cosine similarity.
            indices, cosine_sim = self._content_based_filtering()
            content_recommendations = self._get_content_based_recommendations(random_movie_id, indices, cosine_sim, limit)

            # Return the list of recommended movie IDs based on content similarity.
            return content_recommendations
