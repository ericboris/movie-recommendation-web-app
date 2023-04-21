import React from 'react';
import './App.css';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import UserProfile from '../UserProfile/UserProfile';
import MovieSearch from '../MovieSearch/MovieSearch';

function App() {
    const handleLogin = () => {
        console.log("Logged In!"); 
    };

    const handleSignup = () => {
        console.log("Signed up!"); 
    };

    const userProfile = { id:1, email:"UserEmail@Email.com" };

    const handleSearch = (results) => {
        console.log(results)
    };

    return (
        <div className="App">
            <h1>Movie Recommendation App</h1>
            <nav>
                <LoginForm onLogin={handleLogin} />
                <SignupForm onSignup={handleSignup} />
                <UserProfile user={userProfile} />
                <MovieSearch onSearch={handleSearch} />
            </nav>
        </div>
    );
}

export default App;
