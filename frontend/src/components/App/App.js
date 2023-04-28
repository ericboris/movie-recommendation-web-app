import React, { useState } from 'react';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import UserProfile from '../UserProfile/UserProfile';
import MovieSearch from '../MovieSearch/MovieSearch';
import MovieList from '../MovieList/MovieList';
import movies from '../../staticMovieList';

function App() {
    const [connectedUser, setConnectedUser] = useState(null);

    const handleConnect = (user) => {
        setConnectedUser(user);
    };

    const handleDisconnect = () => {
        setConnectedUser(null);
    };

    const handleSelectMovie = (id) => {
        console.log('Movie id=', id); 
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Movie Recommendation Web App</h1>
            </header>
            {/*
            {connectedUser ? (
                <UserProfile user={connectedUser} />
            ) : (
                <ConnectWallet onConnect={handleConnect} onDisconnect={handleDisconnect} />
            )}
            */}
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        </div>
    );
}

export default App;
