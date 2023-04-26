import React from 'react';
import './App.css';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import UserProfile from '../UserProfile/UserProfile';
import MovieSearch from '../MovieSearch/MovieSearch';
import MovieList from '../MovieList/MovieList';
import MovieCard from '../MovieCard/MovieCard';
import MovieDetails from '../MovieDetails/MovieDetails';

import movieList from '../../staticMovieList';

function App() {
    const userProfile = { id:1, email:"UserEmail@Email.com" };

    const handleLogin = () => {
        console.log("Logged In!"); 
    };

    const handleSignup = () => {
        console.log("Signed up!"); 
    };

    const handleSearch = (results) => {
        console.log(results)
    };

    const handleSelectMovie = (movie) => {
        console.log(movie);
    };

    const handleRating = (id, rating) => {
        console.log(id, rating);
    };

    const handleReview = (id, review) => {
        console.log(id, review);
    };

    return (
        <div className="App">
            <h1>Movie Recommendation App</h1>
            <nav>
                <LoginForm onLogin={handleLogin} />
                <SignupForm onSignup={handleSignup} />
                <UserProfile user={userProfile} />
                <MovieSearch onSearch={handleSearch} />
                { /* <MovieList movies={movieList} onSelectMovie={handleSelectMovie} /> */}
                { /*
                {movieList.map((movie) => (
                    <MovieCard movie={movie} onSelect={handleSelectMovie} />
                ))}
                */ }
                {movieList.map((movie) => (
                    <MovieDetails movie={movie} onRate={handleRating} onReview={handleReview} />
                ))}
            </nav>
        </div>
    );
}

export default App;