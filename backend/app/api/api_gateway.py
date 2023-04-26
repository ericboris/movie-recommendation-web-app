from flask import request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.utils import escape
import jsonschema

from services.user_service import UserService
from services.movie_service import MovieService
from services.rating_service import RatingService
from services.recommendation_service import RecommendationService

from utils.authentication import authenticate_user

limiter = Limiter(app, key_func=get_remote_address, default_limits=["500 per day"])
user_service = UserService()
movie_service = MovieService()
rating_service = RatingService()
recommendation_service = RecommendationService()

# Set maximum request size to 1 MB
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024

# Define JSON schema for input data
input_schema = {
    'type': 'object',
    'properties': {
        'rating': {'type': 'number', 'minimum': 0, 'maximum': 5}
    },
    'required': ['rating']
}

@app.route('/auth/connect', methods=['POST'])
def connect_wallet():
    # Authenticate the user
    wallet_address = authenticate_user()
    if not wallet_address:
        return jsonify({"error": "User not authenticated"})

    return jsonify({"message": "Wallet connected"})

@app.route('/auth/disconnect', methods=['POST'])
def disconnect_wallet():
    # Authenticate the user
    wallet_address = authenticate_user()
    if not wallet_address:
        return jsonify({"error": "User not authenticated"})

    return jsonify({"message": "Wallet disconnected"})

@app.route('/movies/search', methods=['GET'])
@limiter.limit("10 per minute")
def search_movies():
    query = request.args.get('query', '')
    page = request.args.get('page', 1, type=int)
    results = movie_service.search_movies(query, page)
    return jsonify(results)

@app.route('/movies/<int:movie_id>', methods=['GET'])
@limiter.limit("10 per minute")
def get_movie_details(movie_id):
    details = movie_service.get_movie_details(movie_id)
    return jsonify(details)

@app.route('/movies/<int:movie_id>/rating', methods=['POST'])
def create_rating(movie_id):
    # Authenticate the user
    wallet_address = authenticate_user()
    if not wallet_address:
        return jsonify({"error": "User not authenticated"})

    # Validate input data against schema
    try:
        jsonschema.validate(request.json, input_schema)
    except jsonschema.ValidationError:
        return jsonify({'error': 'Invalid input data'}), 400
    
    # Sanitize input data
    rating = escape(request.json['rating'])
    
    rating_service.create_rating(wallet_address, movie_id, rating)
    return jsonify({"message": "Rating created"})

@app.route('/movies/<int:movie_id>/rating', methods=['PUT'])
def update_rating(movie_id):
    # Authenticate the user
    wallet_address = authenticate_user()
    if not wallet_address:
        return jsonify({"error": "User not authenticated"})

    # Validate input data against schema
    try:
        jsonschema.validate(request.json, input_schema)
    except jsonschema.ValidationError:
        return jsonify({'error': 'Invalid input data'}), 400
    
    # Sanitize input data
    rating = escape(request.json['rating'])
    
    rating_service.update_rating(wallet_address, movie_id, rating)
    return jsonify({"message": "Rating updated"})

@app.route('/movies/<int:movie_id>/rating', methods=['DELETE'])
def delete_rating(movie_id):
    # Authenticate the user
    wallet_address = authenticate_user()
    if not wallet_address:
        return jsonify({"error": "User not authenticated"})

    rating_service.delete_rating(wallet_address, movie_id)
    return jsonify({"message": "Rating deleted"})

@app.route('/recommendations', methods=['GET'])
@limiter.limit("10 per minute")
def get_recommendations():
    # Authenticate the user
    wallet_address = authenticate_user()

    # If the user is not authenticated, provide movie recommendations based on collective ratings
    if not wallet_address:
        recommendations = recommendation_service.get_collective_recommendations()
    # If the user is authenticated, provide personalized movie recommendations
    else:
        recommendations = recommendation_service.get_personalized_recommendations(wallet_address)

    return jsonify(recommendations)
