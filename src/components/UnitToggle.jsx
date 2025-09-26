export default function UnitToggle({ tempUnit, setTempUnit, windUnit, setWindUnit, precipUnit, setPrecipUnit }) {
  return (
    <div className="row mb-3">
      <div className="col-md">
        <label className="form-label">🌡 Temperature Unit</label>
        <select className="form-select" value={tempUnit} onChange={(e) => setTempUnit(e.target.value)}>
          <option value="C">°C</option>
          <option value="F">°F</option>
        </select>
      </div>
      <div className="col-md">
        <label className="form-label">💨 Wind Speed Unit</label>
        <select className="form-select" value={windUnit} onChange={(e) => setWindUnit(e.target.value)}>
          <option value="kmh">km/h</option>
          <option value="mph">mph</option>
        </select>
      </div>
      <div className="col-md">
        <label className="form-label">🌧 Precipitation Unit</label>
        <select className="form-select" value={precipUnit} onChange={(e) => setPrecipUnit(e.target.value)}>
          <option value="mm">mm</option>
          <option value="in">inches</option>
        </select>
      </div>
    </div>
  );
}
