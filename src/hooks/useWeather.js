// src/hooks/useWeather.js
import { useState, useEffect } from "react";

/**
 * useWeather hook
 * - input: location (string)
 * - output: { weather, loading, error }
 *
 * weather will be an object normalized to work with the Open-Meteo-compatible components:
 * {
 *   name, country, latitude, longitude,
 *   current: { time, temperature_2m, relative_humidity_2m, wind_speed_10m, precipitation_1h },
 *   hourly: { time: [...], temperature_2m: [...], relative_humidity_2m: [...], wind_speed_10m: [...], precipitation: [...] },
 *   daily: { time: [...], temperature_2m_max: [...], temperature_2m_min: [...], precipitation_sum: [...] }
 * }
 */
export default function useWeather(location) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) {
      setWeather(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      setWeather(null);

      try {
        // 1) Geocode using Open-Meteo Geocoding API
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
        const geoRes = await fetch(geoUrl);
        if (!geoRes.ok) throw new Error("Geocoding request failed");
        const geoJson = await geoRes.json();
        if (!geoJson.results || geoJson.results.length === 0) {
          throw new Error("Location not found");
        }
        const { latitude, longitude, name, country } = geoJson.results[0];

        // 2) Fetch Open-Meteo forecast
        // We request current_weather=true (gives temperature/windspeed) and hourly/daily arrays
        const apiUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current_weather=true` +
          `&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation` +
          `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum` +
          `&timezone=auto`;

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Weather request failed");
        const data = await res.json();

        // Normalize current values:
        const current = {};
        if (data.current_weather) {
          current.time = data.current_weather.time;
          current.temperature_2m = data.current_weather.temperature;
          current.wind_speed_10m = data.current_weather.windspeed;
        }

        // Try to fill humidity and precipitation for the current hour from hourly arrays
        if (data.hourly && Array.isArray(data.hourly.time)) {
          const times = data.hourly.time;
          let idx = times.indexOf(current.time);
          if (idx === -1) {
            // fallback: use nearest index 0
            idx = 0;
          }
          if (data.hourly.relative_humidity_2m) {
            current.relative_humidity_2m = data.hourly.relative_humidity_2m[idx];
          } else {
            current.relative_humidity_2m = null;
          }
          if (data.hourly.precipitation) {
            current.precipitation_1h = data.hourly.precipitation[idx];
          } else {
            current.precipitation_1h = 0;
          }
        }

        const normalized = {
          name,
          country,
          latitude,
          longitude,
          current,
          hourly: data.hourly || null,
          daily: data.daily || null,
        };

        if (!cancelled) {
          setWeather(normalized);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load weather");
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [location]);

  return { weather, loading, error };
}
