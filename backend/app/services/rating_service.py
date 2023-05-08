from ..models import MovieRating
from ..database import db

class RatingService:
    def submit_rating(self, wallet_address: str, movie_id: int, rating: float) -> None:
        """ 
        If user has already rated movie call update_rating, else call create_rating
        """
        movie_rating = MovieRating.query.filter_by(wallet_address=wallet_address, movie_id=movie_id).first()

        if movie_rating:
            movie_rating.rating = rating
        else:
            movie_rating = MovieRating(wallet_address=wallet_address, movie_id=movie_id, rating=rating)
            db.session.add(movie_rating)

        db.session.commit()

    def remove_rating(self, wallet_address: str, movie_id: int) -> None:
        movie_rating = MovieRating.query.filter_by(wallet_address=wallet_address, movie_id=movie_id).first()
        db.session.delete(movie_rating)
        db.session.commit()
