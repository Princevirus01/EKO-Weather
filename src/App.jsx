import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import Charts from "./components/Charts";
import Forecast from "./components/Forecast";
import UnitToggle from "./components/UnitToggle";
import Favorites from "./components/Favorites";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("metric"); // metric | imperial

  const fetchWeather = async () => {
    try {
      // Use geocoding API to convert location -> lat/lon
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        alert("Location not found!");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
      );

      const data = await res.json();
      setWeather({ ...data, name, country });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🌦 Weather Dashboard</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchWeather}>
          Search
        </button>
      </div>

      <UnitToggle units={units} setUnits={setUnits} />

      {weather && (
        <>
          <WeatherCard weather={weather} />
          <WeatherDetails weather={weather} units={units} />
          <Charts weather={weather} units={units} />
          <Forecast weather={weather} units={units} />
          <Favorites weather={weather} />
        </>
      )}
    </div>
  );
}
