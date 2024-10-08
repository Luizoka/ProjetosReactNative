import React from 'react';
import './App.css';
import Map from './Map'; // Import the Map component

function App() {
  return (
    <div className="App">
      <h1>Tapajós Comercio</h1>
      <div className="map-container">
        <Map /> {/* Render the Map component */}
      </div>
    </div>
  );
}

export default App;