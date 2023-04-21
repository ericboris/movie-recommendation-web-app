import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Assuming that MovieService is already imported or defined somewhere
// Example: import MovieService from './MovieService';

const MovieSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (searchTerm.trim() === '') {
            return;
        }

        try {
            // const results = await MovieService.searchMovies(searchTerm);
            const results = "MovieService.searchMovies results";
            // TODO: replace searchTerm with results
            onSearch(searchTerm);
        } catch (error) {
            console.error('Error fetching movie search results:', error);
        }
    };

    return (
        <div className="movie-search">
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    placeholder="Search for movies by title or keywords..."
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

MovieSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default MovieSearch;
