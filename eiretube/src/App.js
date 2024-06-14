import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import UploadPage from './components/UploadPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App container">
                <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/upload" element={isAuthenticated ? <UploadPage /> : <Navigate to="/login" />} />
                    <Route path="/video/:id" element={<VideoPlayer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


