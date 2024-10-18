import React, { useState } from "react";
import "./App.css";

// Helper function to calculate proximity
const getProximityColor = (distance) => {
  if (distance === 0) return "green"; // Dog found
  if (distance < 2) return "red"; // Very close
  if (distance < 4) return "orange"; // Close
  if (distance < 6) return "yellow"; // Moderate
  return "blue"; // Far away
};

function App() {
  const gridSize = 5; // 5x5 grid
  const [dogLocation, setDogLocation] = useState({
    row: Math.floor(Math.random() * gridSize),
    col: Math.floor(Math.random() * gridSize),
  });
  const [clickedLocations, setClickedLocations] = useState([]);

  const handleClick = (row, col) => {
    const distance =
      Math.abs(dogLocation.row - row) + Math.abs(dogLocation.col - col);
    setClickedLocations((prev) => [...prev, { row, col, distance }]);

    if (distance === 0) {
      alert("You found the dog!");
    }
  };

  return (
    <div className="App">
      <h1>Find the Dog Game</h1>
      <div className="grid">
        {Array.from({ length: gridSize }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: gridSize }).map((_, col) => {
              const clickedLocation = clickedLocations.find(
                (loc) => loc.row === row && loc.col === col
              );
              const buttonColor = clickedLocation
                ? getProximityColor(clickedLocation.distance)
                : "white";

              return (
                <button
                  key={col}
                  className="grid-button"
                  style={{ backgroundColor: buttonColor }}
                  onClick={() => handleClick(row, col)}
                >
                  {clickedLocation ? clickedLocation.distance : "?"}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
