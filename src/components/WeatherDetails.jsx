export default function WeatherDetails({ weather, units }) {
  if (!weather || !weather.current) return null;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title">Details</h4>
        <p>🌡 Temperature: {weather.current.temperature_2m} °C</p>
        <p>💧 Humidity: {weather.current.relative_humidity_2m}%</p>
        <p>💨 Wind: {weather.current.wind_speed_10m} {units === "metric" ? "km/h" : "mph"}</p>
      </div>
    </div>
  );
}
