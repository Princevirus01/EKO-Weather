
  
   /*
React Weather App (Bootstrap + Charts + Toasts)
Features:
1. Global location search (OpenWeatherMap Geocoding API)
2. Shows current date & time on dashboard
3. Alarm rules based on temperature, humidity, or weather description
4. Displays temperature, humidity, and other weather criteria
5. Sends notification when a new all-day high or low temperature is attained (throttled to 10 minutes)
6. Displays hourly and daily graphs (temperature trends)
7. Uses Bootstrap 5 for UI styling (instead of Tailwind)
8. Uses Bootstrap Toasts for notifications (instead of system Notification API)

Setup:
1. Create React app (Vite or CRA). Example with Vite:
   npm create vite@latest my-weather-app -- --template react
   cd my-weather-app
   npm install

2. Install dependencies:
   npm install recharts bootstrap

3. Import Bootstrap CSS in src/main.jsx:
   import 'bootstrap/dist/css/bootstrap.min.css';
   import 'bootstrap/dist/js/bootstrap.bundle.min.js';

4. Add OpenWeatherMap API key in .env.local:
   VITE_OWM_API_KEY=your_openweathermap_api_key_here

5. Run app:
   npm run dev
*/


import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherCard from "./components/WeatherCard";
import Alarms from "./components/Alarms";
import Charts from "./components/Charts";
import Notifications from "./components/Notifications";

const API_KEY = import.meta.env.VITE_OWM_API_KEY;

export default function App() {
  const [city, setCity] = useState("Lagos");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [alarms, setAlarms] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [records, setRecords] = useState({ high: -Infinity, low: Infinity });

  // Fetch weather
  const fetchWeather = async (location) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);

      const oneCallRes = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely&appid=${API_KEY}&units=metric`
      );
      const oneCallData = await oneCallRes.json();
      setForecast(oneCallData);

      checkRecords(data.main.temp);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  // Check new daily records
  const checkRecords = (temp) => {
    const now = Date.now();
    if (temp > records.high && (!records.highTime || now - records.highTime > 600000)) {
      setRecords((r) => ({ ...r, high: temp, highTime: now }));
      addNotification(`New daily high: ${temp}°C`);
    }
    if (temp < records.low && (!records.lowTime || now - records.lowTime > 600000)) {
      setRecords((r) => ({ ...r, low: temp, lowTime: now }));
      addNotification(`New daily low: ${temp}°C`);
    }
  };

  // Notifications
  const addNotification = (msg) => {
    setNotifications((n) => [...n, { id: Date.now(), message: msg }]);
  };

  // Handle alarms
  useEffect(() => {
    if (weather && alarms.length > 0) {
      alarms.forEach((alarm) => {
        if (evalAlarm(alarm.condition, weather.main)) {
          addNotification(`Alarm triggered: ${alarm.condition}`);
        }
      });
    }
  }, [weather, alarms]);

  const evalAlarm = (condition, main) => {
    switch (condition) {
      case "temp > 30":
        return main.temp > 30;
      case "temp < 10":
        return main.temp < 10;
      case "humidity > 80":
        return main.humidity > 80;
      default:
        return false;
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🌍 Weather App</h1>

      {/* Search */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => fetchWeather(city)}>
          Search
        </button>
      </div>

      {/* Current Weather */}
      {weather && <WeatherCard weather={weather} />}

      {/* Charts */}
      {forecast && <Charts forecast={forecast} />}

      {/* Alarms */}
      <Alarms alarms={alarms} setAlarms={setAlarms} />

      {/* Notifications */}
      <Notifications notifications={notifications} setNotifications={setNotifications} />
    </div>
  );
}
