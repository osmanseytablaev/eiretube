import React from 'react';
import VideoList from './VideoList';
import SearchBar from './SearchBar';

function HomePage({ isAuthenticated }) {
    return (
        <div>
            <SearchBar />
            <VideoList />
        </div>
    );
}

export default HomePage;
