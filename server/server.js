const express = require('express');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint to proxy weather data
app.get('/api/weather', async (req, res) => {
  try {
    // Get API key from environment variables
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenWeatherMap API key not found. Please set OPENWEATHER_API_KEY in your .env file.');
    }
    
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: 'Providence',
          appid: apiKey,
          units: 'imperial'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});