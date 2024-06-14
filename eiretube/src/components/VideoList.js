import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VideoList.css';  // Ensure this CSS file exists

function VideoList({ videos }) {
    const [allVideos, setAllVideos] = useState([]);

    useEffect(() => {
        if (!videos) {
            async function fetchVideos() {
                try {
                    const response = await axios.get('http://localhost:5000/api/videos');  // Use full URL
                    setAllVideos(response.data);
                } catch (error) {
                    console.error('Error fetching videos:', error);
                }
            }
            fetchVideos();
        } else {
            setAllVideos(videos);
        }
    }, [videos]);

    return (
        <div>
            <h2>Video List</h2>
            <div className="video-grid">
                {allVideos.map(video => (
                    <div key={video._id} className="video-card">
                        <Link to={`/video/${video._id}`}>
                            <img src={video.thumbnailUrl || "/default-thumbnail.png"} alt={video.title} className="video-thumbnail" />
                            <h3>{video.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VideoList;

