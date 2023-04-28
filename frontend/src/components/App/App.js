import React, { useState } from 'react';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import MovieSearch from '../MovieSearch/MovieSearch';
import MovieList from '../MovieList/MovieList';
import movies from '../../staticMovieList';

function App() {
    const [connectedAddress, setConnectedAddress] = useState(null);

    const handleConnect = (address) => {
        setConnectedAddress(address);
    };

    const handleSelectMovie = (id) => {
        console.log("App.handleSelectMovie"); 
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Movie Recommendation Web App</h1>
            </header>
            <ConnectWallet onConnect={handleConnect} />
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} connectedAddress={connectedAddress} />
        </div>
    );
}

export default App;
