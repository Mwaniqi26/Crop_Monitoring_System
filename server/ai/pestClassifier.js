const tf = require('@tensorflow/tfjs-node');
const path = require('path');

// Comment out model loading for demo
/*
let model;
(async () => {
  const modelPath = 'file://' + path.resolve(__dirname, 'ai', 'model.json');
  model = await tf.loadLayersModel(modelPath);
  console.log('Model loaded successfully');
})();
*/

async function classifyPestImage(imageBuffer) {
  // Mock prediction for demo
  const labels = ['Aphid', 'Armyworm', 'Healthy'];
  const randomIndex = Math.floor(Math.random() * labels.length);
  return labels[randomIndex];
}

module.exports = { classifyPestImage };