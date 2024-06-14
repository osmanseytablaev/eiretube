const express = require('express');
const { likeVideo, getLikes } = require('../controllers/likeController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/videos/:id/like', authenticate, likeVideo);
router.get('/videos/:id/likes', getLikes);

module.exports = router;
