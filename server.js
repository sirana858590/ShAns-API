const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import your modules
const girlsvideo = require('./girlsvideo');
const dpboy = require('./dpboy');

// API endpoints
app.get('/ShAn/girlsvideo', async (req, res) => {
  try {
    const mockApi = { reply: (obj) => res.send(obj) };
    await girlsvideo.onStart({ 
      api: {}, 
      event: { senderID: 'user' }, 
      message: { reply: (obj) => res.send(obj) } 
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/ShAn/dpboy', async (req, res) => {
  try {
    await dpboy.onStart({ 
      api: {}, 
      event: {}, 
      message: { reply: (obj) => res.send(obj) } 
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
