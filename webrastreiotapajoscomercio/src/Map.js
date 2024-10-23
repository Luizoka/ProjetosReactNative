import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 65px)' // Adjust height to fill the viewport minus the height of the header
};

const center = {
  lat: -2.430885, // Adjusted to be closer to the markers
  lng: -54.727021
};

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
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/user/${userId}`);
        const data = await response.json();
        
        // Ensure latitude and longitude are numbers
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);

        if (isNaN(lat) || isNaN(lng)) {
          console.error(`Invalid latitude or longitude for user ${userId}:`, data);
          return null;
        }

        return {
          id: data.id,
          position: { lat, lng },
          name: data.name
        };
      } catch (error) {
        console.error(`Error fetching user data for user ${userId}:`, error);
        return null;
      }
    };

    const fetchAllUsers = async () => {
      const userIds = [1, 2, 3]; // Example user IDs
      const userMarkers = await Promise.all(userIds.map(fetchUserData));
      setMarkers(userMarkers.filter(marker => marker !== null));
    };

    fetchAllUsers();
  }, []);

  const togglePoi = () => {
    setShowPoi(!showPoi);
  };

  return (
    <div>
      <button onClick={togglePoi} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
        {showPoi ? 'Esconder Icones' : 'Mostrar Icones'}
      </button>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12} // Increased zoom level to better see the markers
          options={{
            ...mapOptions,
            styles: showPoi ? [] : hidePoiStyles
          }} // Apply map options and styles
        >
          {markers.map(marker => (
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