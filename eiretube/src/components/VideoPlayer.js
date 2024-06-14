import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikeButton from './LikeButton';

function VideoPlayer({ match }) {
    const [video, setVideo] = useState(null);

    useEffect(() => {
        async function fetchVideo() {
            const response = await axios.get(`/api/videos/${match.params.id}`);
            setVideo(response.data);
        }
        fetchVideo();
    }, [match.params.id]);

    return (
        <div>
            {video ? (
                <>
                    <h2>{video.title}</h2>
                    <video width="600" controls>
                        <source src={video.url} type="video/mp4" />
                    </video>
                    <LikeButton videoId={video._id} />
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default VideoPlayer;
