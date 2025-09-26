import { useState, useEffect } from "react";

export default function Favorites({ weather }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const addFavorite = () => {
    if (!weather) return;
    const newFav = { name: weather.name, country: weather.country };
    const updated = [...favorites, newFav];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title">⭐ Favorites</h4>
        <button className="btn btn-outline-success mb-2" onClick={addFavorite}>
          Add Current Location
        </button>
        <ul className="list-group">
          {favorites.map((fav, i) => (
            <li key={i} className="list-group-item">
              {fav.name}, {fav.country}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
