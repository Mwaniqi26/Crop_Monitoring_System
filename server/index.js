const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');
global.fetch = fetch;

const sequelize = require('./models/index').sequelize;
const SensorData = require('./models/SensorData');
const PestPrediction = require('./models/PestPredictions');

app.use(cors());
app.use(express.json());

const sensorRoutes = require('./routes/sensors');
const weatherRoutes = require('./routes/weather');
const pestRoutes = require('./routes/pest');

app.use('/api/sensors', sensorRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/pest', pestRoutes);

sequelize.sync()
  .then(() => {
    app.listen(5001, () => console.log('Server running on port 5001'));
  })
  .catch(err => console.error('DB connection error:', err));