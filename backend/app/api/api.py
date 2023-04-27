from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.utils import escape
import jsonschema

from services import AuthenticationService, MovieService, RatingService, RecommendationService

app = Flask(__name__)
limiter = Limiter(app, key_func=get_remote_address, default_limits=["500 per day"])
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
@AuthenticationService.authenticate_user
def connect_wallet():
    return jsonify({"message": "Wallet connected"})

@app.route('/auth/disconnect', methods=['POST'])
@AuthenticationService.authenticate_user
def disconnect_wallet():
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
@AuthenticationService.authenticate_user
def create_rating(movie_id):
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
@AuthenticationService.authenticate_user
def update_rating(movie_id):
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
@AuthenticationService.authenticate_user
def delete_rating(movie_id):
    rating_service.delete_rating(wallet_address, movie_id)
    return jsonify({"message": "Rating deleted"})

@app.route('/recommendations', methods=['GET'])
@limiter.limit("10 per minute")
def get_recommendations():
    # Authenticate the user
    wallet_address = try_authenticate_user()

    # If the user is not authenticated, provide movie recommendations based on collective ratings
    if not wallet_address:
        recommendations = recommendation_service.get_collective_recommendations()
    # If the user is authenticated, provide personalized movie recommendations
    else:
        recommendations = recommendation_service.get_personalized_recommendations(wallet_address)

    return jsonify(recommendations)
