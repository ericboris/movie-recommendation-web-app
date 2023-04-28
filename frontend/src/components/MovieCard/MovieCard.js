import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';
import ReactStars from 'react-rating-stars-component';

function MovieCard({ movie, userRating, onSelect, onRate }) {
    const handleRating = (rating) => {
        onRate(movie.id, rating);
    };

    const handleClick = () => {
        onSelect(movie.id);
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.releaseYear}</p>
            <ReactStars
                count={5}
                value={userRating}
                size={24}
                activeColor="#ffd700"
                onChange={handleRating}
            />
        </div>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string,
        releaseYear: PropTypes.string,
    }).isRequired,
    userRating: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    onRate: PropTypes.func.isRequired,
};

export default MovieCard;
