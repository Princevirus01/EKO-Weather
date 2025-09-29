// src/App.jsx
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import Charts from "./components/Charts";
import UnitToggle from "./components/UnitToggle";
import Favorites from "./components/Favorites";
import NotificationBanner from "./components/NotificationBanner";
import Alarm from "./components/Alarm";
import useWeather from "./hooks/useWeather";

export default function App() {
  const [location, setLocation] = useState("Lagos");

  // Units
  const [tempUnit, setTempUnit] = useState("C");
  const [windUnit, setWindUnit] = useState("kmh");
  const [precipUnit, setPrecipUnit] = useState("mm");

  // Favorites state
  const [favorites, setFavorites] = useState([]);

  // Notifications
  const [notification, setNotification] = useState(null);
  const [lastAlertTime, setLastAlertTime] = useState(null);

  // Alarms
  const [alarms, setAlarms] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const { weather, loading, error } = useWeather(location);

  // Add current location to favorites
  const addFavorite = () => {
    if (!weather) return;
    const newFav = { name: weather.name, country: weather.country };
    if (!favorites.find(f => f.name === newFav.name && f.country === newFav.country)) {
      setFavorites([...favorites, newFav]);
    }
  };

  // Remove from favorites
  const removeFavorite = (name) => {
    setFavorites(favorites.filter(f => f.name !== name));
  };

  // Format alarm messages
  const formatAlarmMessage = (alarm) => {
    switch (alarm.condition) {
      case "temp_above":
        return `⏰ Alarm: Temperature is above ${alarm.value}°C!`;
      case "temp_below":
        return `⏰ Alarm: Temperature is below ${alarm.value}°C!`;
      case "wind_above":
        return `⏰ Alarm: Windspeed is above ${alarm.value} km/h!`;
      case "rain":
        return `⏰ Alarm: Rain detected!`;
      default:
        return "⏰ Alarm triggered!";
    }
  };

  // 🔔 Check alarms
  useEffect(() => {
    if (!weather || alarms.length === 0) return;

    const now = Date.now();
    if (lastAlertTime && now - lastAlertTime < 10 * 60 * 1000) return;

    for (const alarm of alarms) {
      let triggered = false;

      if (alarm.condition === "temp_above" && weather.current?.temperature > alarm.value) {
        triggered = true;
      }
      if (alarm.condition === "temp_below" && weather.current?.temperature < alarm.value) {
        triggered = true;
      }
      if (alarm.condition === "wind_above" && weather.current?.windspeed > alarm.value) {
        triggered = true;
      }
      if (alarm.condition === "rain") {
        const rainyCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];
        if (rainyCodes.includes(weather.current?.weathercode)) {
          triggered = true;
        }
      }

      if (triggered) {
        const msg = formatAlarmMessage(alarm);
        setNotification({ text: msg, type: "info" });
        setLastAlertTime(now);
        if (Notification.permission === "granted") new Notification(msg);
        break; // only trigger one at a time
      }
    }
  }, [weather, alarms]);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🌦 Weather App</h1>

      <SearchBar onSearch={setLocation} />

      <UnitToggle
        tempUnit={tempUnit}
        setTempUnit={setTempUnit}
        windUnit={windUnit}
        setWindUnit={setWindUnit}
        precipUnit={precipUnit}
        setPrecipUnit={setPrecipUnit}
      />

      {/* Favorites section */}
      <Favorites
        favorites={favorites}
        onSelect={(fav) => setLocation(fav.name)}
        onRemove={removeFavorite}
      />

      {/* Notification banner */}
      <NotificationBanner notification={notification} onClose={() => setNotification(null)} />

      {/* Alarm system */}
      <Alarm alarms={alarms} setAlarms={setAlarms} />

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {weather && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{weather.name}, {weather.country}</h3>
            <button className="btn btn-outline-success btn-sm" onClick={addFavorite}>
              ⭐ Save to Favorites
            </button>
          </div>
          <WeatherDetails
            weather={weather}
            tempUnit={tempUnit}
            windUnit={windUnit}
          />
          <Forecast
            weather={weather}
            tempUnit={tempUnit}
            precipUnit={precipUnit}
            windUnit={windUnit}
          />
          <Charts
            weather={weather}
            tempUnit={tempUnit}
          />
        </>
      )}
    </div>
  );
}
