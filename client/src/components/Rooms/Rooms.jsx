import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";
gsap.registerPlugin(useGSAP, ScrollTrigger);
const Rooms = ({ rooms }) => {
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(
        gridRef.current.querySelectorAll(".room-card")
      );

      // start state (avoid flash)
      gsap.set(items, { opacity: 0, y: 100, willChange: "transform" });

      // staggered reveal when grid enters viewport
      gsap.to(items, {
        opacity: 1,
        y: 0,
        delay:0.1,
        duration: 2,
        ease: "power3.out",
        stagger: { each: 0.20, from: "start" },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%", // when the grid is near the viewport
          toggleActions: "play none none reverse", // reverse on scroll up
          // once: true, // uncomment if you want it only the first time
        },
      });
    },
    { scope: gridRef, dependencies: [rooms] } // re-run when rooms change
  );
  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {rooms.length > 0 &&
        rooms.map((room) => <Card key={room?._id} room={room}></Card>)}
    </div>
  );
};

export default Rooms;
