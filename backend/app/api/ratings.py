from flask import request, jsonify
from ..models import MovieRating
from . import api
from ..database import db

@api.route('/ratings', methods=['POST'])
def create_rating():

    data = request.get_json()
    new_rating = MovieRating(user_id=data['user_id'], movie_id=data['movie_id'], rating=data['rating'])
    db.session.add(new_rating)
    db.session.commit()
    return jsonify(new_rating.to_dict()), 201
