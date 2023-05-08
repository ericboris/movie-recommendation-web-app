import React, { useState } from 'react';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import MovieList from '../MovieList/MovieList';
import movies from '../../staticMovieList';
import { UserProvider } from '../../contexts/UserContext';

function App() {
    const handleSelectMovie = (id) => {
        console.log("App.handleSelectMovie"); 
    };

    return (
        <UserProvider>
            <div className="App">
                <header className="App-header">
                    <h1>Movie Recommendation Web App</h1>
                </header>
                <ConnectWallet />
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            </div>
        </UserProvider>
    );
}

export default App;

