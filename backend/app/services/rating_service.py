from ..models import MovieRating
from ..database import db

class RatingService:
    def create_rating(self, wallet_address: str, movie_id: int, rating: float) -> None:
        movie_rating = MovieRating(wallet_address=wallet_address, movie_id=movie_id, rating=rating)
        db.session.add(movie_rating)
        db.session.commit()

    def update_rating(self, wallet_address: str, movie_id: int, rating: float) -> None:
        movie_rating = MovieRating.query.filter_by(wallet_address=wallet_address, movie_id=movie_id).first()
        movie_rating.rating = rating
        db.session.commit()

    def delete_rating(self, wallet_address: str, movie_id: int) -> None:
        movie_rating = MovieRating.query.filter_by(wallet_address=wallet_address, movie_id=movie_id).first()
        db.session.delete(movie_rating)
        db.session.commit()
