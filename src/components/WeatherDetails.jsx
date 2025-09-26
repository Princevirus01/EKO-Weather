import { formatTemp, formatWind } from "../utils";

export default function WeatherDetails({ weather, tempUnit, windUnit }) {
  if (!weather || !weather.current) return null;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title">Details</h4>
        <p>🌡 Temperature: {formatTemp(weather.current.temperature_2m, tempUnit)}</p>
        <p>💧 Humidity: {weather.current.relative_humidity_2m}%</p>
        <p>💨 Wind: {formatWind(weather.current.wind_speed_10m, windUnit)}</p>
      </div>
    </div>
  );
}
