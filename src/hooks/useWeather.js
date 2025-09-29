// src/hooks/useWeather.js
import { useState, useEffect } from "react";

export default function useWeather(location) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: Geocode location → lat/lon
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            location
          )}&count=1&language=en&format=json`
        );
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("Location not found");
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Step 2: Fetch weather
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,wind_speed_10m,weathercode&hourly=temperature_2m,precipitation,wind_speed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();

        // Helper: map weather codes → condition + icon
        const getConditionFromCode = (code) => {
          const map = {
            0: { label: "Clear", icon: "☀️" },
            1: { label: "Mainly clear", icon: "🌤" },
            2: { label: "Partly cloudy", icon: "⛅" },
            3: { label: "Overcast", icon: "☁️" },
            45: { label: "Fog", icon: "🌫" },
            48: { label: "Depositing rime fog", icon: "🌫" },
            51: { label: "Light drizzle", icon: "🌦" },
            61: { label: "Rain", icon: "🌧" },
            71: { label: "Snow fall", icon: "❄️" },
            95: { label: "Thunderstorm", icon: "⛈" },
          };
          return map[code] || { label: "Unknown", icon: "❓" };
        };

        // Step 3: Group hourly forecast by day
        const hourlyByDay = {};
        data.hourly.time.forEach((time, i) => {
          const day = time.split("T")[0];
          if (!hourlyByDay[day]) hourlyByDay[day] = [];
          hourlyByDay[day].push({
            time,
            temp: data.hourly.temperature_2m[i],
            precip: data.hourly.precipitation[i],
            wind: data.hourly.wind_speed_10m[i],
            condition: getConditionFromCode(data.hourly.weathercode[i]),
          });
        });

        // Step 4: Build daily forecast
        const forecast = data.daily.time.map((date, i) => ({
          date,
          temp: {
            max: data.daily.temperature_2m_max[i],
            min: data.daily.temperature_2m_min[i],
          },
          precip: data.daily.precipitation_sum[i],
          wind: data.daily.windspeed_10m_max[i], // ✅ added daily wind
          condition: getConditionFromCode(data.daily.weathercode[i]),
          hourly: hourlyByDay[date] || [],
        }));

        // Step 5: Build current weather
        const current = {
          time: data.current.time,
          temp: data.current.temperature_2m,
          wind: data.current.wind_speed_10m,
          precip: data.current.precipitation,
          condition: getConditionFromCode(data.current.weathercode),
        };

        setWeather({ name, country, current, forecast });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weather, loading, error };
}
