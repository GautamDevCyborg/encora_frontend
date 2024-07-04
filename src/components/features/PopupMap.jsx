import React, { useEffect, useRef, useContext, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-draw';
import 'leaflet-control-geocoder';
import "../../assets/NewFiles/Css/popupmap.css";
import { AddressContext } from '../../contexts/AddressContext';

const AuditComponent = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const { address, setAddress, setLatlng,setCountry } = useContext(AddressContext);

  const getAddressFromLatLng = useCallback(async (latlng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=en&lat=${latlng.lat}&lon=${latlng.lng}`);
    const data = await response.json();
    setAddress(data.display_name);
    setCountry(data.address.country);
  }, [setAddress,setCountry]);

  

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);

      // Add OpenStreetMap tiles
      L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Add geocoder
      L.Control.geocoder({
        defaultMarkGeocode: false,
      })
        .on('markgeocode', function (e) {
          const bbox = e.geocode.bbox;
          const poly = L.polygon([
            bbox.getSouthEast(),
            bbox.getNorthEast(),
            bbox.getNorthWest(),
            bbox.getSouthWest(),
          ]).addTo(mapRef.current);
          mapRef.current.fitBounds(poly.getBounds());
        })
        .addTo(mapRef.current);

      // Define the custom icon
      const customIcon = L.icon({
        iconUrl: '/images/icon/leaf.png',
        iconSize: [20, 20], // Size of the icon
        iconAnchor: [10, 20], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -20] // Point from which the popup should open relative to the iconAnchor
      });

      // Add drawing controls for markers only
      const drawnItems = new L.FeatureGroup();
      mapRef.current.addLayer(drawnItems);
      drawnItemsRef.current = drawnItems;

      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
        },
        draw: {
          marker: {
            icon: customIcon,
          },
          polyline: false,
          polygon: false,
          circle: false,
          rectangle: false,
          circlemarker: false
        },
      });
      mapRef.current.addControl(drawControl);

      mapRef.current.on(L.Draw.Event.CREATED, async function (event) {
        const layer = event.layer;
        
        // Clear existing markers
        drawnItems.clearLayers();
        
        if (layer instanceof L.Marker) {
          layer.setIcon(customIcon); // Ensure custom icon is used for markers
        }
        
        drawnItems.addLayer(layer);
        
        // Get address for the new marker
        
        const latlng = layer.getLatLng();
        setLatlng(latlng);
        await getAddressFromLatLng(latlng);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [getAddressFromLatLng, setLatlng]);
 
  return (
    <div className='map-container'>
      <div
        id="map"
        ref={mapContainerRef}
        style={{height:"70vh",width:"100%"}}
      ></div>
      <p>{address}</p>
    </div>
  );
};

export default AuditComponent;
