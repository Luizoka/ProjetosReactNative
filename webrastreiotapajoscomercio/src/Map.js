import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 65px)' // Adjust height to fill the viewport minus the height of the header
};

const center = {
  lat: -2.430885, // Adjusted to be closer to the markers
  lng: -54.727021
};

const fakeMarkers = [
  { id: 1, position: { lat: -2.419021, lng: -54.730271 }, name: 'João' },
  { id: 2, position: { lat: -2.430885, lng: -54.727021 }, name: 'Fernando' },
  { id: 3, position: { lat: -2.455229, lng: -54.763669 }, name: 'Pedro' },
  // { id: 4, position: { lat: -2.420000, lng: -54.731000 }, name: 'Maria' },
  // { id: 5, position: { lat: -2.432000, lng: -54.728000 }, name: 'Ana' },
  // { id: 6, position: { lat: -2.450000, lng: -54.760000 }, name: 'Carlos' },
  // { id: 7, position: { lat: -2.425000, lng: -54.735000 }, name: 'Lucas' },
  // { id: 8, position: { lat: -2.435000, lng: -54.740000 }, name: 'Mariana' },
  // { id: 9, position: { lat: -2.445000, lng: -54.750000 }, name: 'Paulo' },
  { id: 10, position: { lat: -2.455000, lng: -54.755000 }, name: 'Beatriz' }
];

const mapOptions = {
  disableDefaultUI: true, // Disable default UI
  zoomControl: true, // Enable zoom control
};

const hidePoiStyles = [
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }]
  }
];

function Map() {
  const [showPoi, setShowPoi] = useState(true);

  const togglePoi = () => {
    setShowPoi(!showPoi);
  };

  return (
    <div>
      <button onClick={togglePoi} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
        {showPoi ? 'Esconder Icones' : 'Mostrar Icones'}
      </button>
      <LoadScript googleMapsApiKey="AIzaSyC3CEidVY4eYwNtsyQ0VJ9fEx1ApPj1QQs">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12} // Increased zoom level to better see the markers
          options={{
            ...mapOptions,
            styles: showPoi ? [] : hidePoiStyles
          }} // Apply map options and styles
        >
          {fakeMarkers.map(marker => (
            <MarkerF
              key={marker.id}
              position={marker.position}
              label={{
                text: marker.name,
                fontSize: '14px',
                fontWeight: 'bold',
                className: 'marker-label'
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;