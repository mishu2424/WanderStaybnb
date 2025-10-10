import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const RoomMap = ({ location }) => {
  const [coords, setCoords] = useState(null);
  const wrapRef = useRef(null);   // local wrapper element (our scope + trigger)

  // entrance anim
  useGSAP(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(
      wrapRef.current,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: wrapRef }); // <-- use your own local scope

  useEffect(() => {
    if (!location) return;
    (async () => {
      try {
        const { data } = await axios(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`
        );
        const first = data.results?.[0];
        if (first) {
          const { lat, lng } = first.geometry.location;
          setCoords({ lat, lng });
          // map renders async; refresh ST after coords change/layout settles
          requestAnimationFrame(() => ScrollTrigger.refresh());
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [location]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <div ref={wrapRef} className="w-full h-80 md:h-screen rounded-3xl my-3">
        {coords ? (
          <Map defaultCenter={coords} defaultZoom={13} mapId={import.meta.env.VITE_GOOGLE_MAP_ID}>
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
