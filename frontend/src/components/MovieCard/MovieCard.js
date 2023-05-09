// MovieCard.js
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';
import ReactStars from 'react-rating-stars-component';
import { UserContext } from '../../contexts/UserContext';
import { isUserLoggedIn } from '../../helpers';
import { submitMovieRating } from '../../services/api';

function MovieCard({ movie, userRating, onSelect }) {
    const { accountAddress } = useContext(UserContext);

    const handleRating = async (rating) => {
        try {
            const responseData = await submitMovieRating(accountAddress, movie.id, rating);
            console.log(responseData);
        } catch (error) {
            console.error('Error submitting rating:', error);
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
            {isUserLoggedIn(accountAddress) ? (
                <ReactStars
                    count={5}
                    value={userRating}
                    size={24}
                    activeColor="#ffd700"
                    onChange={handleRating}
                />
            ) : (
                <p>Please connect your wallet to rate this movie.</p>
            )}
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
};

export default MovieCard;
