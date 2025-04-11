const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const app = express();

// Constants
const PORT = process.env.PORT || 3000;
const DATA_FILES = {
  boys: './dpboys.json',
  girls: './dpgirls.json',
  girlsVideos: './girlsvideos.json'
};

// ========================
// 1. Enhanced JSON Loader
// ========================
function loadDataFile(filePath) {
  try {
    const absolutePath = path.resolve(__dirname, filePath);
    
    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Read and parse file
    const rawData = fs.readFileSync(absolutePath, 'utf8');
    const data = JSON.parse(rawData);

    // Validate data format
    if (!Array.isArray(data)) {
      throw new Error(`Expected array in ${filePath}`);
    }

    // Validate URLs
    data.forEach(url => {
      if (typeof url !== 'string' || !url.startsWith('http')) {
        throw new Error(`Invalid URL format in ${filePath}: ${url}`);
      }
    });

    return data;
  } catch (error) {
    console.error(`❌ Error loading ${filePath}:`, error.message);
    process.exit(1);
  }
}

// Load all data files with validation
const boysImages = loadDataFile(DATA_FILES.boys);
const girlsImages = loadDataFile(DATA_FILES.girls);
const girlsVideos = loadDataFile(DATA_FILES.girlsVideos);

console.log('✅ All data files loaded successfully:');
console.log(`- Boys Images: ${boysImages.length} loaded`);
console.log(`- Girls Images: ${girlsImages.length} loaded`);
console.log(`- Girls Videos: ${girlsVideos.length} loaded`);

// ========================
// 2. Middleware Setup
// ========================
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ========================
// 3. API Endpoints
// ========================

// DP Boy Image
app.get('/ShAn/dpboy', (req, res) => {
  try {
    const randomImage = boysImages[Math.floor(Math.random() * boysImages.length)];
    res.json({ 
      success: true,
      url: randomImage,
      count: boysImages.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('DP Boy Error:', error);
    res.status(500).json({ 
      success: false,
      error: "Internal Server Error" 
    });
  }
});

// DP Girl Image
app.get('/ShAn/dpgirl', (req, res) => {
  try {
    const randomImage = girlsImages[Math.floor(Math.random() * girlsImages.length)];
    res.json({ 
      success: true,
      url: randomImage,
      count: girlsImages.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('DP Girl Error:', error);
    res.status(500).json({ 
      success: false,
      error: "Internal Server Error" 
    });
  }
});

// Girls Video
let sentVideos = [];
app.get('/ShAn/girlsvideo', async (req, res) => {
  try {
    const availableVideos = girlsVideos.filter(video => !sentVideos.includes(video));
    
    if (availableVideos.length === 0) {
      sentVideos = [];
      console.log('⚠️ Video pool reset - all videos shown');
    }

    const randomVideo = availableVideos[Math.floor(Math.random() * availableVideos.length)];
    sentVideos.push(randomVideo);

    console.log(`🎥 Serving video: ${randomVideo}`);
    console.log(`📊 Videos shown: ${sentVideos.length}/${girlsVideos.length}`);

    res.redirect(randomVideo); // Redirect to video URL

  } catch (error) {
    console.error('Girls Video Error:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch video",
      details: error.message
    });
  }
});

// YouTube Download
app.post('/ShAn/ytDl', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || !ytdl.validateURL(url)) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube URL",
        example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      });
    }

    console.log(`⬇️ YouTube Download Request: ${url}`);
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    
    res.json({
      success: true,
      title: info.videoDetails.title,
      duration: info.videoDetails.lengthSeconds,
      downloadUrl: format.url,
      thumbnail: info.videoDetails.thumbnails[0]?.url,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('YouTube DL Error:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to process YouTube video",
      details: error.message
    });
  }
});

// ========================
// 4. Server Start
// ========================
app.listen(PORT, () => {
  console.log(`
  🚀 Server running on port ${PORT}
  === Available Endpoints ===
  GET  /ShAn/dpboy        - Random boy DP
  GET  /ShAn/dpgirl       - Random girl DP
  GET  /ShAn/girlsvideo   - Random girl video
  POST /ShAn/ytDl - YouTube downloader
  `);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('⚠️ Unhandled Rejection:', err);
});
