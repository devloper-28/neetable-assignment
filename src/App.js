import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const cities = [
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'City 1', lat: 37.6879, lng: -122.4702 },
  { name: 'City 2', lat: 37.7636, lng: -122.4174 },
  { name: 'City 3', lat: 37.7943, lng: -122.4349 },
  { name: 'City 4', lat: 37.7987, lng: -122.4075 },
  { name: 'City 5', lat: 37.7349, lng: -122.4566 }
];

const MapContainer = ({ google }) => {
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);

  useEffect(() => {
    if (google) {
      setCenter({ lat: 37.7749, lng: -122.4194 });
    }
  }, [google]);

  useEffect(() => {
    const coordinates = [];

    for (let i = 0; i < cities.length - 1; i++) {
      const city1 = cities[i];
      const city2 = cities[i + 1];

      coordinates.push(city1);
      coordinates.push(city2);
    }

    setPolylineCoordinates(coordinates);
  }, []);

  return (
    <>
    <Map google={google} zoom={12} style={mapStyles} initialCenter={center}>
      {cities.map((city, index) => (
        <Marker key={index} position={city} label={String(index)} />
      ))}
      {polylineCoordinates.length > 0 && (
        <Polyline
          path={polylineCoordinates}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
      )}
    </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgHAWkXG6ucCwx-yMTfaGdIep1gAIh3A0'
})(MapContainer);
