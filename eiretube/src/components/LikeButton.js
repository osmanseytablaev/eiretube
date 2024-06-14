import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LikeButton({ videoId }) {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        async function fetchLikes() {
            const response = await axios.get(`/api/videos/${videoId}/likes`);
            setLikes(response.data.likes);
        }
        fetchLikes();
    }, [videoId]);

    const handleLike = async () => {
        try {
            await axios.post(`/api/videos/${videoId}/like`);
            setLikes(likes + 1);
        } catch (error) {
            console.error('Error liking video:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLike}>Like</button>
            <span>{likes} likes</span>
        </div>
    );
}

export default LikeButton;
