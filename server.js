const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// Data files
const boysImages = require('./boys.json');
const girlsImages = require('./girls.json');
const girlsVideos = require('./girlsvideos.json');

// ========================
// 1. DP IMAGE ENDPOINTS
// ========================
app.get('/ShAn/dpboy', (req, res) => {
    try {
        const randomImage = boysImages[Math.floor(Math.random() * boysImages.length)];
        res.json({ 
            success: true,
            url: randomImage 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

app.get('/ShAn/dpgirl', (req, res) => {
    try {
        const randomImage = girlsImages[Math.floor(Math.random() * girlsImages.length)];
        res.json({ 
            success: true,
            url: randomImage 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// ========================
// 2. GIRLS VIDEO ENDPOINT
// ========================
let sentVideos = [];

app.get('/ShAn/girlsvideo', async (req, res) => {
    try {
        const availableVideos = girlsVideos.filter(video => !sentVideos.includes(video));
        
        if (availableVideos.length === 0) {
            sentVideos = [];
        }

        const randomVideo = availableVideos[Math.floor(Math.random() * availableVideos.length)];
        sentVideos.push(randomVideo);

        // Get video stream
        const response = await axios.get(randomVideo, { responseType: 'stream' });
        
        res.setHeader('Content-Type', 'video/mp4');
        response.data.pipe(res);

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch video" 
        });
    }
});

// ========================
// 3. YOUTUBE DOWNLOAD
// ========================
app.post('/ShAn/ytDl', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url || !ytdl.validateURL(url)) {
            return res.status(400).json({
                success: false,
                message: "Invalid YouTube URL"
            });
        }

        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        
        res.json({
            success: true,
            title: info.videoDetails.title,
            downloadUrl: format.url,
            thumbnail: info.videoDetails.thumbnails[0]?.url
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running port ${PORT}`);
});
