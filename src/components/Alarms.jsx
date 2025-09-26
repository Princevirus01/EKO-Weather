
import React, { useState } from "react";

export default function Alarms({ alarms, setAlarms }) {
  const [condition, setCondition] = useState("");

  const addAlarm = () => {
    if (!condition) return;
    setAlarms([...alarms, { id: Date.now(), condition }]);
    setCondition("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title">⏰ Weather Alarms</h4>
        <div className="input-group mb-3">
          <select
            className="form-select"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">Select condition</option>
            
            <option value="">Select condition</option>
            <option value="temp > 30">Temperature &gt; 30°C</option>
            <option value="temp < 10">Temperature &lt; 10°C</option>
            <option value="humidity > 80">Humidity &gt; 80%</option>

          </select>
          <button className="btn btn-success" onClick={addAlarm}>
            Add
          </button>
        </div>
        <ul className="list-group">
          {alarms.map((alarm) => (
            <li key={alarm.id} className="list-group-item">
              {alarm.condition}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
