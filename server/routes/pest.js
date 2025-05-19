const express = require('express');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const { classifyPestImage } = require('../ai/pestClassifier');
const PestPrediction = require('../models/PestPredictions');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/detect', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const result = await classifyPestImage(imageBuffer);
    await PestPrediction.create({
      prediction: result,
      imageName: req.file.originalname || 'unknown',
    });
    res.json({ prediction: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/history', async (req, res) => {
  try {
    const predictions = await PestPrediction.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
    res.json(predictions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;