import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import Charts from "./components/Charts";
import UnitToggle from "./components/UnitToggle";
import useWeather from "./hooks/useWeather";

export default function App() {
  const [location, setLocation] = useState("Lagos");

  // 🔹 Independent unit states
  const [tempUnit, setTempUnit] = useState("C");   // C | F
  const [windUnit, setWindUnit] = useState("kmh"); // kmh | mph
  const [precipUnit, setPrecipUnit] = useState("mm"); // mm | in

  const { weather, loading, error } = useWeather(location);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🌦 Weather App</h1>

      {/* Search city */}
      <SearchBar onSearch={setLocation} />

      {/* Unit toggles */}
      <UnitToggle
        tempUnit={tempUnit}
        setTempUnit={setTempUnit}
        windUnit={windUnit}
        setWindUnit={setWindUnit}
        precipUnit={precipUnit}
        setPrecipUnit={setPrecipUnit}
      />

      {/* Loading / Error */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Weather content */}
      {weather && (
        <>
          <WeatherDetails weather={weather} tempUnit={tempUnit} windUnit={windUnit} />
          <Forecast weather={weather} tempUnit={tempUnit} precipUnit={precipUnit} />
          <Charts weather={weather} tempUnit={tempUnit} />
        </>
      )}
    </div>
  );
}
