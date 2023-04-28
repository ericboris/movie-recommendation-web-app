import React from 'react';
import PropTypes from 'prop-types';

function UserProfile({ address }) {
  return (
    <div>
      <p>Wallet Address: {address}</p>
    </div>
  );
}

UserProfile.propTypes = {
    address: PropTypes.string.isRequired,
};

export default UserProfile;

