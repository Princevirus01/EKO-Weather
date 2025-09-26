
// src/components/SearchBar.jsx
import React, { useState } from "react";

/**
 * Props:
 *  - onSearch(locationString)  // called when user submits
 *  - initialValue (optional)
 */
export default function SearchBar({ onSearch, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  function submit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form onSubmit={submit} className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter city or place (e.g. Lagos, Nigeria)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search location"
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
}
