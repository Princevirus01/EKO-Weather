
import React from "react";

export default function WeatherCard({ weather }) {
  const date = new Date().toLocaleString();
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h3 className="card-title">{weather.name}</h3>
        <p className="card-text">{date}</p>
        <p className="card-text">🌡 {weather.main.temp} &deg;C</p>
        <p className="card-text">💧 Humidity: {weather.main.humidity}%</p>
        <p className="card-text">🌥 {weather.weather[0].description}</p>
      </div>
    </div>
  );
}
