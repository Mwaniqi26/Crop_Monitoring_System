const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:location', async (req, res) => {
  const { location } = req.params;
  try {
    if (!location || location.trim() === '') {
      return res.status(400).json({ error: 'Location is required' });
    }
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OWM_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (err) {
    if (err.response) {
      // OpenWeatherMap API error
      if (err.response.status === 401) {
        res.status(401).json({ error: 'Invalid API key' });
      } else if (err.response.status === 404) {
        res.status(404).json({ error: 'Location not found' });
      } else {
        res.status(500).json({ error: 'Weather service error' });
      }
    } else {
      // Network or other error
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
});

module.exports = router;