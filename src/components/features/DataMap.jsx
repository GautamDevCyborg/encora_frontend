import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Create custom icons for verified and unverified trees
const verifiedIcon = new L.Icon({
  iconUrl: "/images/icon/leaf.png", // URL to your verified icon
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const unverifiedIcon = new L.Icon({
  iconUrl: "/images/icon/leaf.png", // URL to your unverified icon
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const TreeMap = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/upload/all-images`);
        setTrees(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const position = [20.5937, 78.9629]; // Center position for the map

  return (
    <MapContainer
      center={position}
      zoom={4}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {trees.map((tree) => (
          <Marker
            key={tree._id}
            position={[tree.lat, tree.lng]}
            icon={tree.verified ? verifiedIcon : unverifiedIcon}
          >
            <Popup>
              <img src={tree.imageUrl} alt={tree.name} />
              <p style={{display:"block",fontSize:"20px",fontWeight:"bold"}}>{tree.Plant_name}</p>
              <p style={{display:"block"}}>Location: {tree.Address}</p>
              <p style={{display:"block"}}>Uploaded On: {new Date(tree.createdAt).toLocaleDateString()}</p>
              <p style={{display:"block"}}>Uploaded By: {tree.users_username}</p>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default TreeMap;