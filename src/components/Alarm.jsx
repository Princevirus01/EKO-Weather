
// src/components/Alarm.jsx
import { useState, useEffect } from "react";

export default function Alarm({ alarms, setAlarms, weather }) {
  const [condition, setCondition] = useState("temp_above");
  const [value, setValue] = useState("");

  // Save alarms to localStorage
  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }, [alarms]);

  const addAlarm = () => {
    if (!value) return;
    const newAlarm = { id: Date.now(), condition, value: parseFloat(value) };
    setAlarms([...alarms, newAlarm]);
    setValue("");
  };

  const removeAlarm = (id) => {
    setAlarms(alarms.filter(a => a.id !== id));
  };

  return (
    <div className="card p-3 my-3">
      <h5>⏰ Weather Alarms</h5>
      <div className="d-flex gap-2 mb-3">
        <select
          className="form-select"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="temp_above">Temperature above</option>
          <option value="temp_below">Temperature below</option>
          <option value="wind_above">Wind speed above</option>
          <option value="rain">Rain detected</option>
        </select>
        <input
          type="number"
          className="form-control"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={condition === "rain"}
        />
        <button className="btn btn-primary" onClick={addAlarm}>
          Add
        </button>
      </div>

      {alarms.length > 0 ? (
        <ul className="list-group">
          {alarms.map((a) => (
            <li
              key={a.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {a.condition === "temp_above" && `Temp > ${a.value}°C`}
                {a.condition === "temp_below" && `Temp < ${a.value}°C`}
                {a.condition === "wind_above" && `Wind > ${a.value} km/h`}
                {a.condition === "rain" && "Rain detected"}
              </span>
              <button className="btn btn-sm btn-danger" onClick={() => removeAlarm(a.id)}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No alarms set</p>
      )}
    </div>
  );
}
