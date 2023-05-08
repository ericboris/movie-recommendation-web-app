from flask import Blueprint, request, jsonify
from werkzeug.utils import escape
import jsonschema

from ..services import AuthenticationService, MovieService, RatingService, RecommendationService

api_bp = Blueprint('api', __name__)
movie_service = MovieService()
rating_service = RatingService()
recommendation_service = RecommendationService()

# Define JSON schema for input data
input_schema = {
    'type': 'object',
    'properties': {
        'rating': {'type': 'number', 'minimum': 0, 'maximum': 5}
    },
    'required': ['rating']
}

@api_bp.route('/', methods=['GET'], endpoint='index')
def index():
    return jsonify({"message": "Hello, World!"})

@api_bp.route('/auth/connect', methods=['POST'], endpoint='connect_wallet')
@AuthenticationService.authenticate_user
def connect_wallet():
    return jsonify({"message": "Wallet connected"})

@api_bp.route('/auth/disconnect', methods=['POST'], endpoint='disconnect_wallet')
@AuthenticationService.authenticate_user
def disconnect_wallet():
    return jsonify({"message": "Wallet disconnected"})

@api_bp.route('/movies/search', methods=['GET'], endpoint='search_movies')
def search_movies():
    query = request.args.get('query', '')
    page = request.args.get('page', 1, type=int)
    results = movie_service.search_movies(query, page)
    return jsonify(results)

@api_bp.route('/movies/<int:movie_id>', methods=['GET'], endpoint='get_movie_details')
def get_movie_details(movie_id):
    details = movie_service.get_movie_details(movie_id)
    return jsonify(details)

@api_bp.route('/movies/<int:movie_id>/rating', methods=['PUT'], endpoint='submit_rating')
@AuthenticationService.authenticate_user
def submit_rating(movie_id):
    # Validate input data against schema
    try:
        jsonschema.validate(request.json, input_schema)
    except jsonschema.ValidationError:
        return jsonify({'error': 'Invalid input data'}), 400
    
    # Sanitize input data
    rating = escape(request.json['rating'])
    
    rating_service.make_rating(wallet_address, movie_id, rating)
    return jsonify({"message": "Rating submitted"})

@api_bp.route('/movies/<int:movie_id>/rating', methods=['DELETE'], endpoint='remove_rating')
@AuthenticationService.authenticate_user
def remove_rating(movie_id):
    rating_service.remove_rating(wallet_address, movie_id)
    return jsonify({"message": "Rating removed"})

@api_bp.route('/recommendations', methods=['GET'], endpoint='get_recommendations')
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
