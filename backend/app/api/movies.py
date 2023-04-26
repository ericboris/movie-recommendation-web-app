from flask import request, jsonify
from . import api

@api.route('/movies', methods=['GET'])
def get_movies():
    # Fetch movies from an external API or perform a database query here
    movies = ["MOVIE 1"] # Replace this with actual data
    return jsonify(movies)
