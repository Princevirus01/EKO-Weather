export const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
export const toCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

export const formatTemp = (value, unit) =>
  unit === "F" ? `${toFahrenheit(value).toFixed(1)} °F` : `${value.toFixed(1)} °C`;

export const formatWind = (value, unit) =>
  unit === "mph" ? `${(value / 1.609).toFixed(1)} mph` : `${value} km/h`;

export const formatPrecip = (value, unit) =>
  unit === "in" ? `${(value / 25.4).toFixed(2)} in` : `${value} mm`;
