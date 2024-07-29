import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VideoList.css';

const VideoList = () => {
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
        <div className="video-grid">
            {videos.length > 0 ? (
                videos.map((video) => (
                    <div key={video._id} className="video-card">
                        <Link to={`/video/${video._id}`}>
                            <img src={video.thumbnailUrl} alt={video.title} className="video-thumbnail" />
                        </Link>
                        <Link to={`/video/${video._id}`} className="video-title">{video.title}</Link>
                    </div>
                ))
            ) : (
                <p>No videos found</p>
            )}
        </div>
    );
};

export default VideoList;














