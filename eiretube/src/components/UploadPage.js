import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import './UploadPage.css';

function UploadPage() {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading spinner
        setMessage(''); // Clear any previous messages

        const formData = new FormData();
        formData.append('title', title);
        formData.append('thumbnail', thumbnail);
        formData.append('video', video);

        try {
            const response = await axios.post('https://ec2-13-60-73-114.eu-north-1.compute.amazonaws.com:5000/api/videos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Video uploaded successfully', response.data);
            setMessage('Video uploaded successfully!');
        } catch (error) {
            console.error('Error uploading video:', error);
            setMessage('Error uploading video. Please try again.');
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    return (
        <div className="upload-page">
            {loading && <LoadingSpinner />}
            <h1>Upload Video</h1>
            <form onSubmit={handleUpload}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br />
                <label>
                    Thumbnail:
                    <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" required />
                </label>
                <br />
                <label>
                    Video:
                    <input type="file" onChange={(e) => setVideo(e.target.files[0])} accept="video/*" required />
                </label>
                <br />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UploadPage;











