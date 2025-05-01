import React from 'react';
import WeatherComponent from './WeatherComponent';
import './App.css';  // Import the CSS file

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-heading">Welcome to the Weather App</h1>
      <WeatherComponent />
      {/* Add other components below */}
    </div>
  );
};

export default HomePage;
