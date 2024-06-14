import React, { useState } from 'react';
import axios from 'axios';

function VideoUpload() {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('video', file);

        try {
            await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });
            alert('Upload successful');
        } catch (error) {
            setError('Upload failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Video</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default VideoUpload;
