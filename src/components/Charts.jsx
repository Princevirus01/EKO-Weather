import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Charts({ weather, units }) {
  if (!weather || !weather.hourly) return null;

  const chartData = weather.hourly.time.map((time, i) => ({
    time: new Date(time).getHours() + ":00",
    temperature: weather.hourly.temperature_2m[i],
    humidity: weather.hourly.relative_humidity_2m[i],
    wind: weather.hourly.wind_speed_10m[i],
  }));

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title">Hourly Forecast</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData.slice(0, 24)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temp (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#387908" name="Humidity (%)" />
            <Line type="monotone" dataKey="wind" stroke="#0088FE" name={`Wind (${units === "metric" ? "km/h" : "mph"})`} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
