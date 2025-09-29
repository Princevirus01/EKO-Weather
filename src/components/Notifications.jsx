// src/components/Notifications.jsx
import { useEffect, useRef, useState } from "react";

export default function Notifications({ weather, tempUnit }) {
  const [todayMax, setTodayMax] = useState(null);
  const [todayMin, setTodayMin] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const lastNotificationTime = useRef(0);

  // Ask for permission once
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!weather || !weather.current) return;

    const checkAlerts = () => {
      const now = new Date();
      const todayStr = now.toDateString();

      // 🔄 Reset when a new day starts
      if (todayStr !== currentDate) {
        setTodayMax(null);
        setTodayMin(null);
        setCurrentDate(todayStr);
      }

      // ⏳ Enforce 10-minute gap between alerts
      if (Date.now() - lastNotificationTime.current < 10 * 60 * 1000) {
        return;
      }

      // 🌡️ Convert temperature to correct units
      const tempC = weather.current.temperature_2m;
      const temp = tempUnit === "F" ? tempC * 9 / 5 + 32 : tempC;

      let message = null;
      const locationName = weather.name || "this location";

      // 📈 New high
      if (todayMax === null || temp > todayMax) {
        setTodayMax(temp);
        message = `🔥 New high in ${locationName}: ${temp.toFixed(1)}°${tempUnit}`;
      }
      // 📉 New low
      else if (todayMin === null || temp < todayMin) {
        setTodayMin(temp);
        message = `❄️ New low in ${locationName}: ${temp.toFixed(1)}°${tempUnit}`;
      }

      // 🔔 Fire notification
      if (message && Notification.permission === "granted") {
        new Notification("Weather Alert", { body: message });
        lastNotificationTime.current = Date.now();
      }
    };

    // Run once immediately, then every 10 minutes
    checkAlerts();
    const interval = setInterval(checkAlerts, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [weather, tempUnit, todayMax, todayMin, currentDate]);

  return null; // no UI output
}
