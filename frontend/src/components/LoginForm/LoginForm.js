import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO Replace the following line with your UserService authentication method
            // await UserService.authenticate(email, password);
            onLogin();
            handleClose();
        } catch (error) {
            // Handle error (e.g. display a message to the user)
        }
    };

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleOpen = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <>
            <button onClick={handleOpen}>Login</button>
            {show && (
                <div className="login-popup">
                    <div className="login-popup-content">
                        <span className="close" onClick={handleClose}>&times;</span>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => handleChange(e, setEmail)}
                                required
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => handleChange(e, setPassword)}
                                required
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginForm;

/*
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform login logic (e.g. call API, validate user, redirect)
    console.log(`Email: ${email}, Password: ${password}`);
    window.location.href = "search.html";
});
*/


