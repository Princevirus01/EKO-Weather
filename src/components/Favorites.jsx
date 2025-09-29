// src/components/FavoritesTabs.jsx
import React from "react";

export default function FavoritesTabs({ favorites, current, onSelect, onRemove }) {
  if (favorites.length === 0) return null;

  return (
    <ul className="nav nav-tabs mb-3">
      {favorites.map((fav, idx) => (
        <li key={idx} className="nav-item d-flex align-items-center">
          <button
            className={`nav-link ${fav.name === current ? "active" : ""}`}
            onClick={() => onSelect(fav)}
          >
            {fav.name}, {fav.country}
          </button>
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={() => onRemove(fav.name)}
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  );
}
