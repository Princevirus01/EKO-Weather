export default function UnitToggle({ units, setUnits }) {
  return (
    <div className="mb-3">
      <select
        className="form-select"
        value={units}
        onChange={(e) => setUnits(e.target.value)}
      >
        <option value="metric">🌍 Metric (°C, km/h, mm)</option>
        <option value="imperial">🇺🇸 Imperial (°F, mph, in)</option>
      </select>
    </div>
  );
}
