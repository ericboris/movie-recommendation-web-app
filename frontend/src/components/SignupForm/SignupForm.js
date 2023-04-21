import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SignupForm.css';

const SignupForm = ({ onSignup }) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }

        try {
            // TODO Replace the following with UserService authentication
            // await UserService.authenticate(email, password);
            onSignup();
            handleClose();
        } catch (error) {
            setError(error.message)
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
            { !show && <button onClick={handleOpen}>Sign Up</button> }
            { show && (
                <div className="signup-popup">
                    <div className="signup-popup-content">
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
                            <label htmlFor="password-confirmation">Password:</label>
                            <input
                                type="password"
                                id="password-confirmation"
                                value={passwordConfirmation}
                                onChange={(e) => handleChange(e, setPasswordConfirmation)}
                                required
                            />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

SignupForm.propTypes = {
    onSignup: PropTypes.func.isRequired,
};

export default SignupForm;
