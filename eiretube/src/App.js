import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UploadPage from './components/UploadPage';
import VideoPlayer from './components/VideoPlayer';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/video/:id" element={<VideoPlayer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;













