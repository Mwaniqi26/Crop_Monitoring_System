const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

router.post('/', async (req, res) => {
  try {
    const data = await SensorData.create(req.body);
    res.status(201).send('Sensor data saved');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/', async (req, res) => {
  const data = await SensorData.findAll();
  res.json(data);
});

module.exports = router;