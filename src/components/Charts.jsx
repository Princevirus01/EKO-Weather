
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Charts({ forecast }) {
  const hourly = forecast.hourly.slice(0, 12).map((h) => ({
    time: new Date(h.dt * 1000).getHours() + ":00",
    temp: h.temp,
  }));

  const daily = forecast.daily.slice(0, 5).map((d) => ({
    date: new Date(d.dt * 1000).toLocaleDateString(),
    temp: d.temp.day,
  }));

  return (
    <div className="mb-4">
      <h4>📊 Hourly Forecast</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={hourly}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="temp" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>

      <h4 className="mt-4">📆 Daily Forecast</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={daily}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="temp" stroke="#28a745" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
