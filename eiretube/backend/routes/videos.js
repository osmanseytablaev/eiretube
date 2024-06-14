const express = require('express');
const multer = require('multer');
const { uploadVideo, getVideos, getVideoById, searchVideos } = require('../controllers/videoController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticate, upload.single('video'), uploadVideo);
router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);
router.get('/videos/search', searchVideos);

module.exports = router;
