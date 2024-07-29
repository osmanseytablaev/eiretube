import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoList from './VideoList';
import './HomePage.css';

function HomePage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://eiretube-env.eba-sbdsqzzq.eu-north-1.elasticbeanstalk.com/api/videos');
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="homepage">
            <h1>Home</h1>
            <VideoList videos={videos} />
        </div>
    );
}

export default HomePage;



