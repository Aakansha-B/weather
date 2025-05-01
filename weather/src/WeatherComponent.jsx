import React, { useState } from 'react';
import './WeatherComponent.css'; // Add styling here

const WeatherComponent = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      setError('');
      setWeather(null);

      // Get coordinates using Open-Meteo geocoding API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError('Location not found');
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Get weather using Open-Meteo
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        ...weatherData.current_weather,
        name,
        country,
      });
    } catch (err) {
      setError('Error fetching weather');
    }
  };

  return (
    <div className="weather-container">
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        value={location}
        placeholder="Enter a city name..."
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.country}</h2>
          <p>🌡️ Temperature: {weather.temperature}°C</p>
          <p>💨 Windspeed: {weather.windspeed} km/h</p>
          <p>🧭 Direction: {weather.winddirection}°</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
