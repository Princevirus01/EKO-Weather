export default function WeatherCard({ weather }) {
  if (!weather || !weather.current) return null;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body text-center">
        <h3>{weather.name}, {weather.country}</h3>
        <h2>{weather.current.temperature_2m} °C</h2>
        <p>Humidity: {weather.current.relative_humidity_2m}%</p>
        <p>Wind: {weather.current.wind_speed_10m} km/h</p>
        <small>Updated: {new Date(weather.current.time).toLocaleString()}</small>
      </div>
    </div>
  );
}
