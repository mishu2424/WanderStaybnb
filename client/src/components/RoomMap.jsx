import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useState } from "react";

const RoomMap = ({ location }) => {
  const [coords, setCoords] = useState(null);
  console.log("came here");

  const fetchCoords = async () => {
    try {
      const { data } = await axios(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`
      );
      console.log(data);
      if (data.results && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoords({ lat, lng });
      } else {
        console.error("No geocode results found for:", location);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (!location) return;

    fetchCoords();
  }, [location]);
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <div className="w-full h-screen rounded-3xl my-3">
        {coords ? (
          <Map
            defaultCenter={coords}
            defaultZoom={13}
            mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          >
            <AdvancedMarker position={coords} />
          </Map>
        ) : (
          <p>Map loading...</p>
        )}
      </div>
    </APIProvider>
  );
};

export default RoomMap;
