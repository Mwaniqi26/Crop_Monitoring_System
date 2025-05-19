import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [weather, setWeather] = useState(null);
  const [pestPrediction, setPestPrediction] = useState(null);
  const [pestHistory, setPestHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('Nairobi');

  const fetchData = async () => {
    setLoading(true);
    try {
      const sensorRes = await axios.get('http://localhost:5001/api/sensors');
      setSensorData(sensorRes.data);
      const weatherRes = await axios.get(`http://localhost:5001/api/weather/${location}`);
      setWeather(weatherRes.data);
      const historyRes = await axios.get('http://localhost:5001/api/pest/history');
      setPestHistory(historyRes.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch data: ' + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Poll every minute
    return () => clearInterval(interval);
  }, [location]);

  const handleImageUpload = async (event) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      const res = await axios.post('http://localhost:5001/api/pest/detect', formData);
      setPestPrediction(res.data.prediction);
      await fetchData(); // Refresh history
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Pest detection failed: ' + err.message);
    }
    setLoading(false);
  };

  const addMockSensorData = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5001/api/sensors/mock');
      await fetchData(); // Refresh sensor data
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add mock sensor data: ' + err.message);
    }
    setLoading(false);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Crop Monitoring Dashboard (Demo)</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      <h2 style={{ color: '#34495e' }}>Weather Forecast</h2>
      <form onSubmit={handleLocationSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter city (e.g., Nairobi)"
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#3498db', color: 'white', border: 'none' }}>
          Get Weather
        </button>
      </form>
      {weather ? (
        <div style={{ backgroundColor: '#ecf0f1', padding: '15px', borderRadius: '5px' }}>
          <p><strong>{weather.name}</strong>: {weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C (Feels like: {weather.main.feels_like}°C)</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}

      <h2 style={{ color: '#34495e' }}>Sensor Data</h2>
      <button
        onClick={addMockSensorData}
        disabled={loading}
        style={{ padding: '8px 16px', backgroundColor: '#3498db', color: 'white', border: 'none', marginBottom: '10px' }}
      >
        Add Mock Sensor Data
      </button>
      {sensorData.length === 0 ? (
        <p>No sensor data available</p>
      ) : (
        sensorData.map((d, i) => (
          <div key={i} style={{ backgroundColor: '#ecf0f1', padding: '10px', marginBottom: '5px', borderRadius: '5px' }}>
            <p>Temp: {d.temperature}°C, Humidity: {d.humidity}%, Moisture: {d.soilMoisture}%</p>
          </div>
        ))
      )}

      <h2 style={{ color: '#34495e' }}>Upload Crop Image for Pest Detection</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} disabled={loading} style={{ marginBottom: '10px' }} />
      {pestPrediction && <p>Pest Detection Result: {pestPrediction}</p>}

      <h2 style={{ color: '#34495e' }}>Pest Detection History</h2>
      {pestHistory.length === 0 ? (
        <p>No pest predictions available</p>
      ) : (
        pestHistory.map((p, i) => (
          <div key={i} style={{ backgroundColor: '#ecf0f1', padding: '10px', marginBottom: '5px', borderRadius: '5px' }}>
            <p>
              Prediction: {p.prediction}, Image: {p.imageName || 'Unknown'}, Time: {new Date(p.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;