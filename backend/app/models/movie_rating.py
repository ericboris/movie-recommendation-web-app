from sqlalchemy import CheckConstraint
from ..database import db

class MovieRating(db.Model):
    __tablename__ = 'movie_ratings'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    wallet_address = db.Column(db.String(42), nullable=False)
    movie_id = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp(), nullable=False)

    __table_args__ = (
        db.UniqueConstraint('wallet_address', 'movie_id', name='uq_wallet_movie'),
        CheckConstraint('rating >= 0 AND rating <= 5', name='rating_range')
    )
