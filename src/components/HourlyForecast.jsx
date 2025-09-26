
import React, { useState } from "react";


export default function HourlyForecast({ forecast }) {
  if (!forecast) return null;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title">Hourly Forecast</h4>
        <div className="d-flex flex-wrap">
          {forecast.time.slice(0, 12).map((time, idx) => (
            <div key={time} className="card text-center me-2 mb-2 p-2" style={{ minWidth: "80px" }}>
              <strong>{new Date(time).getHours()}:00</strong>
              <span>{forecast.temperature_2m[idx]} °C</span>
              <small>{forecast.relative_humidity_2m[idx]}%</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

