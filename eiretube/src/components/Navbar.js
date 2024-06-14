import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, handleLogout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Eiretube</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {isAuthenticated && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/upload">Upload</Link>
                        </li>
                    )}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {!isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <img src="/logo.svg" alt="avatar" className="avatar" />
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;



