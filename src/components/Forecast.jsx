// src/components/Forecast.jsx
import React, { useState } from "react";

export default function Forecast({ weather, tempUnit, precipUnit, windUnit }) {
  const [expandedDay, setExpandedDay] = useState(null);

  if (!weather) return null;

  const formatTemp = (temp) => {
    if (temp === undefined || temp === null) return "N/A";
    return tempUnit === "celsius"
      ? `${temp.toFixed(1)}°C`
      : `${((temp * 9) / 5 + 32).toFixed(1)}°F`;
  };

  const formatPrecip = (precip) => {
    if (precip === undefined || precip === null) return "N/A";
    return precipUnit === "mm"
      ? `${precip.toFixed(1)} mm`
      : `${(precip / 25.4).toFixed(2)} in`;
  };

  const formatWind = (wind) => {
    if (wind === undefined || wind === null) return "N/A";
    return windUnit === "kmh"
      ? `${wind.toFixed(1)} km/h`
      : `${(wind / 1.609).toFixed(1)} mph`;
  };

  return (
    <div className="forecast mt-4">
      <h2 className="mb-3 text-center">🌤️ Daily Forecast</h2>

      {weather.forecast.map((day, i) => (
        <div
          key={i}
          className="card mb-3 shadow-sm"
          style={{ borderRadius: "12px" }}
        >
          {/* Header section */}
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer", background: "#f8f9fa" }}
            onClick={() => setExpandedDay(expandedDay === i ? null : i)}
          >
            <h5 className="mb-0">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </h5>
            <span style={{ fontSize: "18px" }}>
              {expandedDay === i ? "▲" : "▼"}
            </span>
          </div>

          {/* Daily summary */}
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="fw-bold">
                {day.condition.icon} {day.condition.label}
              </div>
              <div>🌡 {formatTemp(day.temp.max)} / {formatTemp(day.temp.min)}</div>
              <div>💧 {formatPrecip(day.precip)}</div>
              <div>💨 {formatWind(day.wind)}</div>
            </div>

            {/* Hourly dropdown */}
            {expandedDay === i && (
              <div className="mt-3 border-top pt-3">
                <h6 className="fw-bold mb-2">Hourly Forecast</h6>
                <div className="list-group">
                  {day.hourly.map((h, j) => (
                    <div
                      key={j}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        {new Date(h.time).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          hour12: true,
                        })}
                      </span>
                      <span>
                        {h.condition.icon} {h.condition.label}
                      </span>
                      <span>{formatTemp(h.temp)}</span>
                      <span>💧 {formatPrecip(h.precip)}</span>
                      <span>💨 {formatWind(h.wind)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
