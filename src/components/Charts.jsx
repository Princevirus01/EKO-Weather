import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatTemp, formatWind } from "../utils";

export default function Charts({ weather, units }) {
  if (!weather || !weather.hourly) return null;

  const chartData = weather.hourly.time.map((time, i) => ({
    time: new Date(time).getHours() + ":00",
    temperature:
      units === "imperial"
        ? (weather.hourly.temperature_2m[i] * 9) / 5 + 32
        : weather.hourly.temperature_2m[i],
    humidity: weather.hourly.relative_humidity_2m[i],
    wind:
      units === "imperial"
        ? weather.hourly.wind_speed_10m[i] / 1.609
        : weather.hourly.wind_speed_10m[i],
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
            <Tooltip
              formatter={(value, name) => {
                if (name === "temperature")
                  return [formatTemp(value, units), "Temp"];
                if (name === "wind") return [formatWind(value, units), "Wind"];
                return [`${value}%`, "Humidity"];
              }}
            />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature" />
            <Line type="monotone" dataKey="humidity" stroke="#387908" name="Humidity" />
            <Line type="monotone" dataKey="wind" stroke="#0088FE" name="Wind" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
