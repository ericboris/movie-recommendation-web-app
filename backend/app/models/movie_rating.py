from sqlalchemy import CheckConstraint
from ..database import db

class MovieRating(db.Model):
    __tablename__ = 'movie_ratings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    __table_args__ = (
        CheckConstraint('rating >= 0 AND rating <= 5', name='rating_range'),
    )
