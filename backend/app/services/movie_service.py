import requests
from functools import lru_cache
from dotenv import load_dotenv
import os

load_dotenv()

class MovieService:
    API_BASE_URL = 'https://api.themoviedb.org/3'
    API_KEY = os.environ.get('MOVIE_DB_API_KEY')

    def search_movies(self, query: str, page: int) -> list:
        url = f'{self.API_BASE_URL}/search/movie'
        params = {
            'api_key': self.API_KEY,
            'query': query,
            'page': page
        }
        response = requests.get(url, params=params)
        return response.json()['results']

    @lru_cache(maxsize=1000)
    def get_movie_details(self, movie_id: int) -> dict:
        url = f'{self.API_BASE_URL}/movie/{movie_id}'
        params = {
            'api_key': self.API_KEY
        }
        response = requests.get(url, params=params)
        return response.json()
