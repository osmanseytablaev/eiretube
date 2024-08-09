import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const registerUrl = 'http://ec2-51-20-83-93.eu-north-1.compute.amazonaws.com:5000/api/auth/register';
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(registerUrl, {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/'); // Redirect to home after successful registration
        } catch (error) {
            console.error("Abra Gada  bra", registerUrl, error);
            console.error('Error during registration:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
















