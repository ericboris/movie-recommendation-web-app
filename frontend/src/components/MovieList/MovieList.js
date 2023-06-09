import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList({ movies, onSelectMovie }) {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} userRating={0} onSelect={onSelectMovie} />
            ))}
        </div>
    );
}

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            poster: PropTypes.string,
            releaseYear: PropTypes.string,
        }),
    ).isRequired,
    onSelectMovie: PropTypes.func.isRequired,
};

export default MovieList;
