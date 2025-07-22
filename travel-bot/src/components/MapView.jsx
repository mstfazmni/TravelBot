import React from "react";

const MapView = ({ plan }) => {
    const locationMatch = plan.match(/Places to visit:\s*(.+)/i);
    const places = locationMatch ? locationMatch[1].split(',').map(p => p.trim()) : [];

    const firstLocation = places[0] || "World";
    
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>Map View</h3>
        <p><strong>Showing:</strong> {firstLocation}</p>
        <iframe
            title="Plan Location Map"
            width="100%"
            height="350"
            style={{ border: "0", borderRadius: "10px" }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodeURIComponent(firstLocation)}&output=embed`}
        ></iframe>
        </div>
  );
};

export default MapView;