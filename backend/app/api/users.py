from flask import request, jsonify
from ..models import User
from . import api
from ..database import db

@api.route('/users', methods=['POST'])
def create_user():

    data = request.get_json()
    new_user = User(email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201
