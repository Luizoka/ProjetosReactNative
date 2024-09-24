import React from 'react';
import './App.css';
import Map from './Map'; // Import the Map component

function App() {
  return (
    <div className="App">
      <h1>Rastreio Tapajós Comercio</h1>
      <div style={{ width: '100%', height: '400px' }}>
        <Map /> {/* Render the Map component */}
      </div>
    </div>
  );
}

export default App;