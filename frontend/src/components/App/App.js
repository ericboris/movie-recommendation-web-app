import React from 'react';
import './App.css';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';

function App() {
    const handleLogin = () => {
        console.log("Logged In!"); 
    };

    const handleSignup = () => {
        console.log("Signed up!"); 
    };

    return (
        <div className="App">
            <h1>Movie Recommendation App</h1>
            <nav>
                <LoginForm onLogin={handleLogin} />
                <SignupForm onSignup={handleSignup} />
            </nav>
        </div>
    );
}

export default App;
