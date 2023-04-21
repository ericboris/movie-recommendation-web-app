import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MovieDetails = ({ movie, onRate, onReview }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleRateClick = () => {
        onRate(movie.id, rating);
        setRating(0);
    };

    const handleReviewClick = () => {
        onReview(movie.id, review);
        setReview('');
    };

    return (
        <div>
            <h2>{movie.title}</h2>
            { /* TODO support poster
            <img src={movie.poster} alt={movie.title} />
            */ }
            <p>{movie.description}</p>
            { /* TODO support director and actors 
            <p>Director: {movie.director}</p>
            <p>Actors: {movie.actors.join(', ')}</p>
            */ }
            <p>Release Date: {movie.releaseDate}</p>

            <div>
                <label htmlFor="rating">Rate this movie: </label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={rating}
                    min="0"
                    max="10"
                    onChange={handleRatingChange}
                />
                <button onClick={handleRateClick}>Submit Rating</button>
            </div>

            <div>
                <label htmlFor="review">Write a review: </label>
                <textarea
                    id="review"
                    name="review"
                    value={review}
                    onChange={handleReviewChange}
                />
                <button onClick={handleReviewClick}>Submit Review</button>
            </div>
        </div>
    );
};

MovieDetails.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        // poster: PropTypes.string,
        description: PropTypes.string,
        // director: PropTypes.string,
        // actors: PropTypes.arrayOf(PropTypes.string),
        releaseDate: PropTypes.string,
    }).isRequired,
    onRate: PropTypes.func.isRequired,
    onReview: PropTypes.func.isRequired,
};

export default MovieDetails;
