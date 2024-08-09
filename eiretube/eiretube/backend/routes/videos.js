const express = require('express');
const { uploadVideo, getVideos, getVideoById, getAllVideos} = require('../controllers/videoController');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/:id', getVideoById);
router.get('/', getAllVideos);
router.post('/', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), uploadVideo);

module.exports = router;















