import React from 'react';
import PropTypes from 'prop-types';

function ConnectWallet({ onConnect, onDisconnect }) {
  const handleConnectClick = async () => {
    // Connect to MetaMask and authenticate user here
  };

  const handleDisconnectClick = () => {
    onDisconnect();
  };

  return (
    <div>
      <button onClick={handleConnectClick}>Connect Wallet</button>
      <button onClick={handleDisconnectClick}>Disconnect Wallet</button>
    </div>
  );
}

ConnectWallet.propTypes = {
  onConnect: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
};

export default ConnectWallet;
