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
    try {
        const file = req.file;
        const title = req.body.title;
        const stream = fs.createReadStream(file.path);

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `videos/${Date.now()}_${path.basename(file.path)}`,
            Body: stream,
            ContentType: file.mimetype,
        };

        s3.upload(uploadParams, async (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const video = new Video({
                title: title,
                url: data.Location,
            });

            await video.save();
            res.status(201).json(video);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchVideos = async (req, res) => {
    try {
        const query = req.query.query;
        const videos = await Video.find({ title: new RegExp(query, 'i') });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
