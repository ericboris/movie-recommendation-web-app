import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';

function MovieCard({ movie, userRating, isConnected, onSelect, onRate }) {
    const handleRate = (rating) => {
        if (isConnected) {
            onRate(movie.id, rating);
        } else {
            alert('Please connect your MetaMask wallet to rate movies.');
        }
    };

    const handleClick = () => {
        onSelect(movie.id);
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.releaseYear}</p>
            {/* Implement 5-star rating system here and call handleRate with the user's rating */}
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
    isConnected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onRate: PropTypes.func.isRequired,
};

export default MovieCard;
