// src/components/WeatherDetails.jsx
export default function WeatherDetails({ weather, tempUnit, windUnit }) {
  if (!weather?.current) return null;

  // ✅ Convert temperature (C ↔ F)
  const formatTemp = (temp) => {
    if (temp === undefined || temp === null) return "N/A";
    if (tempUnit === "C") {
      return `${temp.toFixed(1)} °C`;
    } else {
      return `${(((temp * 9) / 5) + 32).toFixed(1)} °F`;
    }
  };

  // ✅ Convert wind speed (km/h ↔ mph)
  const formatWind = (wind) => {
    if (wind === undefined || wind === null) return "N/A";
    if (windUnit === "kmh") {
      return `${wind.toFixed(1)} km/h`;
    } else {
      return `${(wind / 1.609).toFixed(1)} mph`;
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">
          Current Weather in {weather.name}, {weather.country}
        </h4>
        <p>
          <strong>Temperature:</strong> {formatTemp(weather.current.temp)}
        </p>
        <p>
          <strong>Wind Speed:</strong> {formatWind(weather.current.wind)}
        </p>
        <p>
          <strong>Precipitation:</strong>{" "}
          {weather.current.precip !== undefined
            ? `${weather.current.precip.toFixed(1)} mm`
            : "N/A"}
        </p>
        <p>
          <strong>Condition:</strong>{" "}
          {weather.current.condition.icon} {weather.current.condition.text}
        </p>
      </div>
    </div>
  );
}
