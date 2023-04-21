import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onSelect }) => {
    const { id, title, poster, description } = movie;

    const handleClick = () => {
        onSelect(id);
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            { /* TODO support poster
            <img src={poster} alt={`${title} Poster`} className="movie-card__poster" />
            */ }
            <div className="movie-card__info">
                <h3 className="movie-card__title">{title}</h3>
                <p className="movie-card__description">{description}</p>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        // poster: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default MovieCard;
