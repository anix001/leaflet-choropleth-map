import { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, GeoJSON} from 'react-leaflet';
import CaliforniaJsonData from "./utils/california-counties.json";


function App() {
  const [geoJSON, setGeoJSON] = useState(CaliforniaJsonData);
  const [clickedPosition, setClickedPosition] = useState(null);
  const mapRef = useRef();
  const center = { lat: 36.778259, lng: -119.417931 };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setClickedPosition({ lat, lng });
  }

  // const cityStyle = {
  //   fillColor: 'green', // Change this to the desired color
  //   fillOpacity: 0.5,
  //   color: 'white',
  //   weight: 1,
  // };


  // //for tooltip on hover
  // const onEachCity = (city, layer) => {
  //   layer.bindPopup(city.properties.name); 
  //   layer.bindTooltip(
  //     `<div>
  //       <div>City: ${city.properties.name}</div>
  //       <div>Population: ${city.properties.population}</div>
  //     </div>`, 
  //     { direction: 'top' }
  //   ); 
  // };

  const getRandomColor = () => {
    const colors = ['red', 'yellow', 'green'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const onEachCity = (city, layer) => {
    const cityColor = getRandomColor();
    layer.setStyle({ fillColor: cityColor , fillOpacity: '0.5', weight:'0.5', color:'blue'}); // Set random color for each city
    layer.bindPopup(city.properties.name); 
    layer.bindTooltip(
      `<div>
        <div>City: ${city.properties.name}</div>
        <div>Population: ${city.properties.population}</div>
      </div>`, 
      { direction: 'top' }
    ); 
  };

  return (
    <MapContainer
      center={center}
      zoom={6}
      scrollWheelZoom={true}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
      ref={mapRef}
      onClick={handleMapClick}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        {geoJSON && (
          <GeoJSON
            data={geoJSON}
            // style={cityStyle} // Apply style to all cities
            onEachFeature={onEachCity} // Bind popup to each city
          />
        )}
      </FeatureGroup>
      {clickedPosition && (
        <Marker position={[clickedPosition.lat, clickedPosition.lng]} >
          <Popup>
            A marker placed at <br /> Latitude: {clickedPosition.lat.toFixed(6)}, Longitude: {clickedPosition.lng.toFixed(6)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default App;
