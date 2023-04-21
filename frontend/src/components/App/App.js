import React from 'react';
import './App.css';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import UserProfile from '../UserProfile/UserProfile';

function App() {
    const handleLogin = () => {
        console.log("Logged In!"); 
    };

    const handleSignup = () => {
        console.log("Signed up!"); 
    };

    const userProfile = { id:1, email:"UserEmail@Email.com" };

    return (
        <div className="App">
            <h1>Movie Recommendation App</h1>
            <nav>
                <LoginForm onLogin={handleLogin} />
                <SignupForm onSignup={handleSignup} />
                <UserProfile user={userProfile} />
            </nav>
        </div>
    );
}

export default App;
