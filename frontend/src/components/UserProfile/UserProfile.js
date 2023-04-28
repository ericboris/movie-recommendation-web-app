import React from 'react';
import PropTypes from 'prop-types';

function UserProfile({ user }) {
  return (
    <div>
      <p>Wallet Address: {user.address}</p>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;

