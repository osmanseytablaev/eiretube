import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './VideoPlayer.css';

function VideoPlayer() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://ec2-51-20-83-93.eu-north-1.compute.amazonaws.com:5000/api/videos/${id}`);
                setVideo(response.data);
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();
    }, [id]);

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <div className="video-player-container">
            <h1>{video.title}</h1>
            <div className="video-wrapper">
                <video className="video-player" controls>
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default VideoPlayer;
















