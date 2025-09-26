import { useState } from "react";
import { formatTemp, formatPrecip } from "../utils";

export default function Forecast({ weather, tempUnit, precipUnit }) {
  if (!weather || !weather.daily) return null;

  const [dayIndex, setDayIndex] = useState(0);

  const days = weather.daily.time.map((d, i) => ({
    date: new Date(d).toDateString(),
    min: weather.daily.temperature_2m_min[i],
    max: weather.daily.temperature_2m_max[i],
    precipitation: weather.daily.precipitation_sum[i],
  }));

  const selected = days[dayIndex];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title">Daily Forecast</h4>
        <div className="btn-group mb-3">
          {days.map((d, i) => (
            <button
              key={i}
              className={`btn btn-sm ${i === dayIndex ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setDayIndex(i)}
            >
              {new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })}
            </button>
          ))}
        </div>
        <p>📅 {selected.date}</p>
        <p>🌡 Min: {formatTemp(selected.min, tempUnit)} / Max: {formatTemp(selected.max, tempUnit)}</p>
        <p>🌧 Precipitation: {formatPrecip(selected.precipitation, precipUnit)}</p>
      </div>
    </div>
  );
}
