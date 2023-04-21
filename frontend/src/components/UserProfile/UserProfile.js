import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import UserService from './services/UserService';
import './UserProfile.css';

const UserProfile = ({ user }) => {
    const [profile, setProfile] = useState(null);
    const [ratedMovies, setRatedMovies] = useState([]);
    
    useEffect(() => {
        async function fetchProfile() {
            // const userProfile = await UserService.getUserProfile(user.id);
            const userProfile = { 
                name: "BillyBob NameName", 
                ratedMovies: [
                    { id:1, title:'Movie1', rating:1 }, 
                    { id:2, title:'Movie2', rating:2 }, 
                    { id:3, title:'Movie3', rating:3 }, 
                ]
            };
            setProfile(userProfile);
            setRatedMovies(userProfile.ratedMovies);
        }
        fetchProfile();
    }, [user.id]);

    const handleProfileUpdate = async (updatedProfile) => {
        // const newProfile = await UserService.updateUserProfile(user.id, updatedProfile);
        console.log('Profile Update');
        setProfile(newProfile);
    };

    const handleDeleteProfile = async () => {
        // await UserService.deleteUserProfile(user.id);
        console.log('Profile Delete');
        // Handle user logout or redirection after profile deletion
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p>Email: {user.email}</p>
            <p>Name: {profile.name}</p>
            <h3>Rated Movies</h3>
            <ul>
                {ratedMovies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} - {movie.rating} stars
                    </li>
                ))}
            </ul>
            {/* <button onClick={() => handleProfileUpdate(updatedProfile)}>Update Profile</button> */}
            {/* <button onClick={handleDeleteProfile}>Delete Profile</button> */}
        </div>
    );
};

UserProfile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
};

export default UserProfile;
