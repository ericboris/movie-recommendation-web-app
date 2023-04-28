import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import detectEthereumProvider from '@metamask/detect-provider';

function ConnectWallet({ onConnect }) {
    const [account, setAccount] = useState(null);

    const handleConnect = async () => {
        const provider = await detectEthereumProvider();

        if (provider) {
            try {
                const accounts = await provider.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    onConnect(account);
                }
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('Please install MetaMask to use this feature.');
        }
    };

    useEffect(() => {
        const checkConnectedWallet = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                const accounts = await provider.request({ method: 'eth_accounts' });
                setAccount(accounts[0]);
                onConnect(account);
            }
        };
        checkConnectedWallet();
    }, []);

    return (
        <div>
            { account ? 
                <p>Address: {account.slice(0, 4)}...{account.slice(-4)}</p>
            :
                <button onClick={handleConnect}>Connect</button> 
            }
        </div>
    );
}

ConnectWallet.propTypes = {
    onConnect: PropTypes.func.isRequired,
};

export default ConnectWallet;
