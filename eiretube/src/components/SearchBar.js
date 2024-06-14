import React, { useState } from 'react';
import axios from 'axios';
import VideoList from './VideoList';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        setSearched(true);
        try {
            const response = await axios.get(`/api/videos/search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error searching videos:', error);
            setResults([]); // Ensure results are cleared if there's an error
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search videos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {searched && results.length === 0 && <div>No videos found</div>}
            {results.length > 0 && <VideoList videos={results} />}
        </div>
    );
}

export default SearchBar;

