import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import detectEthereumProvider from '@metamask/detect-provider';
import { UserContext } from '../../contexts/UserContext';
import { isUserLoggedIn } from '../../helpers';

function ConnectWallet() {
    const { accountAddress, setAccountAddress } = useContext(UserContext);

    const handleConnect = async () => {
        const provider = await detectEthereumProvider();

        if (provider) {
            try {
                const accounts = await provider.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    setAccountAddress(accounts[0]);
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
                setAccountAddress(accounts[0]);
            }
        };
        checkConnectedWallet();
    }, []);

    return (
        <div>
            { isUserLoggedIn(accountAddress) ? 
                <p>Address: {accountAddress.slice(0, 4)}...{accountAddress.slice(-4)}</p>
            :
                <button onClick={handleConnect}>Connect</button> 
            }
        </div>
    );
}

export default ConnectWallet;
