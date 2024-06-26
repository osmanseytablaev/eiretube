const Video = require('../models/Video');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS SDK
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new aws.S3();


exports.uploadVideo = async (req, res) => {
    const { title } = req.body;
    const thumbnail = req.files['thumbnail'][0];
    const video = req.files['video'][0];

    const uploadParams = (file, key) => ({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    try {
        const thumbnailData = await s3.upload(uploadParams(thumbnail, `thumbnails/${Date.now()}-${thumbnail.originalname}`)).promise();
        const videoData = await s3.upload(uploadParams(video, `videos/${Date.now()}-${video.originalname}`)).promise();

        const newVideo = new Video({
            title,
            thumbnailUrl: thumbnailData.Location,
            videoUrl: videoData.Location,
        });

        await newVideo.save();
        res.status(200).json(newVideo);
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getVideoById = async (req, res) => {
    console.log('Fetching video with ID:', req.params.id);
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            console.log('Video not found');
            return res.status(404).json({ error: 'Video not found' });
        }
        console.log('Video found:', video);
        res.json(video);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

















