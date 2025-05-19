const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

router.post('/', async (req, res) => {
  try {
    const { temperature, humidity, soilMoisture } = req.body;
    if (!temperature || !humidity || !soilMoisture || isNaN(temperature) || isNaN(humidity) || isNaN(soilMoisture)) {
      return res.status(400).send('Invalid sensor data');
    }
    const data = await SensorData.create({ temperature, humidity, soilMoisture });
    res.status(201).send('Sensor data saved');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await SensorData.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/mock', async (req, res) => {
  try {
    const mockData = {
      temperature: (Math.random() * 10 + 20).toFixed(1), // 20-30°C
      humidity: (Math.random() * 20 + 50).toFixed(1), // 50-70%
      soilMoisture: (Math.random() * 30 + 20).toFixed(1), // 20-50%
    };
    const data = await SensorData.create(mockData);
    res.status(201).send('Mock sensor data saved');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;