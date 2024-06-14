const Like = require('../models/Like');
const Video = require('../models/Video');

exports.likeVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const like = new Like({ user: req.userId, video: req.params.id });
        await like.save();

        res.status(201).json({ message: 'Video liked' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLikes = async (req, res) => {
    try {
        const likes = await Like.countDocuments({ video: req.params.id });
        res.status(200).json({ likes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
