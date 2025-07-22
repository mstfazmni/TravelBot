import React, { useEffect, useState } from 'react';
import Spinner from './Spinner'; 
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom Icons
const icons = {
  beach: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4245/4245606.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),
  hike: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3771/3771429.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),
  temple: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4087/4087326.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),
  default: new L.Icon.Default(),
};

// Function to get icon based on keyword
const getIcon = (place) => {
  const p = place.toLowerCase();
  if (p.includes('beach') || p.includes('nusa')) return icons.beach;
  if (p.includes('hike') || p.includes('mount') || p.includes('canyon') || p.includes('trail')) return icons.hike;
  if (p.includes('temple') || p.includes('shrine') || p.includes('inari') || p.includes('gion')) return icons.temple;
  return icons.default;
};

const FlyToBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
};

const MapView = ({ plan }) => {
  const locationMatch = plan.match(/Places to visit:\s*(.+)/i);
  const places = locationMatch ? locationMatch[1].split(',').map(p => p.trim()) : [];

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchCoords = async () => {
      const results = [];

      for (const place of places) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              place
            )}`
          );
          const data = await res.json();
          if (data[0]) {
            results.push({
              name: place,
              latlng: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
            });
          }
        } catch (err) {
          console.error('Error fetching:', place);
        }
      }

      setPositions(results);
    };

    fetchCoords();
  }, [plan]);

  if (positions.length === 0) return <Spinner />;

  const bounds = positions.map(p => p.latlng);
  const polylinePositions = positions.map(p => p.latlng);

  return (
    <div style={{ padding: '2rem 0', textAlign: 'center' }}>
      <h3>🌍Map View</h3>
      <p>All places from your travel plan</p>

      <div
        style={{
          height: '500px',
          width: '90%',
          margin: '0 auto',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        }}
      >
        <MapContainer
          center={bounds[0]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {positions.map((pos, idx) => (
            <Marker
              key={idx}
              position={pos.latlng}
              icon={getIcon(pos.name)}
            >
              <Popup>{pos.name}</Popup>
            </Marker>
          ))}

          <Polyline positions={polylinePositions} color="#f97316" weight={4} />
          <FlyToBounds bounds={bounds} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
