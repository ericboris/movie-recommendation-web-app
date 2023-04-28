import React, { useState } from 'react';
import PropTypes from 'prop-types';

function MovieSearch({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search for movies"
      />
      <button type="submit">Search</button>
    </form>
  );
}

MovieSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MovieSearch;
