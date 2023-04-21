import React from 'react';
import PropTypes from 'prop-types';

const MovieList = ({ movies, onSelectMovie }) => {
    const handleMovieClick = (movie) => {
        onSelectMovie(movie);
    };

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="movie-item"
                    onClick={() => handleMovieClick(movie)}
                >
                    { /* TODO support poster
                    <img
                        src={movie.poster}
                        alt={`Poster for ${movie.title}`}
                        className="movie-poster"
                    />
                    */ }
                    <div className="movie-info">
                        <h3 className="movie-title">{movie.title}</h3>
                        <p className="movie-description">{movie.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            // poster: PropTypes.string,
            description: PropTypes.string,
        }),
    ).isRequired,
    onSelectMovie: PropTypes.func.isRequired,
};

export default MovieList;
