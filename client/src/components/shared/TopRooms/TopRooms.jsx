import { Link, useLocation } from "react-router-dom";
import companyLogo from "../../../assets/images/wanderstay.png";
import Container from "../Container";
import PopularRooms from "./PopularRooms";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
const TopRooms = () => {
  const container = useRef();
  const popularTextRef = useRef();
  const cardsRef = useRef();
  const location=useLocation();
  // When you navigate back to Home, refresh trigger positions once it renders.
  useEffect(() => {
    // wait one frame for layout to settle (images, fonts, etc.)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);
  useGSAP(
    (context, contextSafe) => {
      gsap.fromTo(
        popularTextRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          stagger: 0.5,
          scrollTrigger: {
            trigger: container.current, // watch this section
            start: "top 45%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
      gsap.fromTo(
        cardsRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          stagger: 0.5,
          scrollTrigger: {
            trigger: container.current, // watch this section
            start: "top 40%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
    },
    { scope: container }
  );
  return (
    <Container>
      <div className="my-5">
        <h2 className="font-extrabold text-xl uppercase bg-green-800 text-white my-2">
          Popular destinations
        </h2>
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 "
          ref={container}
        >
          <div
            className="relative flex flex-col items-center gap-3 justify-center mb-2"
            ref={popularTextRef}
          >
            <h1 className="uppercase text-5xl font-bold font-bebas tracking-wide">
              Popular rooms
            </h1>
            <p className="text-center">
              Discover our most-loved stays chosen by travelers from around the
              world. From cozy hideaways to stylish city escapes, these rooms
              are where comfort meets unforgettable experiences. Each space is
              thoughtfully designed to make you feel at home, whether you are
              unwinding by the beach or exploring a bustling city. Book your
              perfect stay today and see why these destinations are among our
              guests’ top favorites.
            </p>
          </div>
          <div
            ref={cardsRef}
            className="relative w-full h-full object-cover flex flex-col gap-5"
          >
            <PopularRooms />
            <Link
              to={`/rooms`}
              className="relative group btn flex bg-green-800 text-white items-center justify-start px-6 py-3 overflow-hidden font-bold rounded group"
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0  opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                Explore More
                <svg
                  className="w-7 h-7 inline pl-2 scale-0 group-hover:scale-100 text-green-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute inset-0  rounded-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TopRooms;
