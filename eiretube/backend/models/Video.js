const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: String,
    url: String,
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
