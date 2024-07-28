import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

const MapWithUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          const data = await response.json();
          const { address } = data;
          setLocationName(address ? address.display_name : "Unknown");
        } catch (error) {
          console.error("Error retrieving location name:", error);
        }
      },
      (error) => {
        setError(`Error retrieving location: ${error.message}`);
      }
    );
  }, []);

  const saveLocationToDatabase = async () => {
    try {
      const [latitude, longitude] = userLocation;
      const response = await axios.post('https://local-labor-market-web-applications.onrender.com/api/v1/pin', { latitude, longitude, locationName });
      console.log('Location saved:', response.data);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <div className=" w-screen h-screen">
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
            <Popup>
              <div>
                <p>Location: {locationName}</p>
                <button onClick={saveLocationToDatabase}>Save Location</button>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapWithUserLocation;
