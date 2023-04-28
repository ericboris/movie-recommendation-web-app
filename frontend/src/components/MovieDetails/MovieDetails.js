import React from 'react';
import PropTypes from 'prop-types';

function MovieDetails({ movie, onClose }) {
  return (
    <div>
      <button onClick={onClose}>Close</button>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.releaseYear}</p>
      <p>{movie.description}</p>
      <p>Director: {movie.director}</p>
      <ul>
        {movie.actors.map((actor, index) => (
          <li key={index}>{actor}</li>
        ))}
      </ul>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string,
    releaseYear: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.string,
    actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieDetails;
