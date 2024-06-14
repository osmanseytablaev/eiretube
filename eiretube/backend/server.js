require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videos');
const likeRoutes = require('./routes/likes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use('/api', authRoutes);
app.use('/api', videoRoutes);
app.use('/api', likeRoutes);

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with an error
    });

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});




