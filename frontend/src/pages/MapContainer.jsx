import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
  const jimmaUniversityLocation = { lat: 7.3063, lng: 36.8071 };

  const apiKey = 'AIzaSyBNKWFt36O8xAX3IlimQgTypvyVPFke_VM';

  return (
    <div className='ml-20 mt-20 ' style={{ height: '400px', width: '100%' }}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '80%' }}
          
          center={jimmaUniversityLocation}
          zoom={15}
        >
            <h>jimmaUniversityLocation</h>
          <Marker position={jimmaUniversityLocation} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;
