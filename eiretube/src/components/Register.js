import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            console.log('Registering with:', { username, password });
            const response = await axios.post('http://localhost:5000/api/register', { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token);  // Store token in local storage
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            alert('Registration successful');
            navigate('/');  // Redirect to home page
        } catch (error) {
            alert('Registration failed');
            console.error('Error during registration:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;





