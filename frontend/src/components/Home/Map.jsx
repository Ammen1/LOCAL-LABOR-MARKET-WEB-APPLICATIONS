import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapWithUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        setError(`Error retrieving location: ${error.message}`);
      }
    );
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapWithUserLocation;
