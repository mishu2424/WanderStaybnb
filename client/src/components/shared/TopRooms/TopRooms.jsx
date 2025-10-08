import { Link } from "react-router-dom";
import companyLogo from "../../../assets/images/wanderstay.png";
import articleVideo from "../../../assets/videos/video1.mp4";
import Container from "../Container";
import PopularRooms from "./PopularRooms";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
const TopRooms = () => {
  const container = useRef();
  const cursorRef = useRef();
  const videoRef = useRef();
  useGSAP(
    (context, contextSafe) => {
      const cursor = cursorRef.current;
      const scope = container.current;
      const video = videoRef.current;

      // Center transform on the cursor & hide initially
      gsap.set(cursor, { opacity: 0, scale: 0, xPercent: -50, yPercent: -50 });
      gsap.set(cursor, { willChange: "transform" }); // perf hint

      // 🔥 trailing setters
      const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.45,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.45,
        ease: "power3.out",
      });

      // On mouse move, follow cursor smoothly
      const handleMouseMove = (e) => {
        const rect = video.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // trailing movement
        xTo(x);
        yTo(y);
      };

      // Show cursor on enter
      const handleMouseEnter = () => {
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      };

      // Hide cursor on leave
      const handleMouseLeave = () => {
        gsap.to(cursor, {
          opacity: 0,
          scale: 0,
          duration: 0.1,
        });
      };

      // Attach listeners
      video.addEventListener("mousemove", handleMouseMove);
      video.addEventListener("mouseenter", handleMouseEnter);
      video.addEventListener("mouseleave", handleMouseLeave);

      gsap.fromTo(
        video,
        {
          y:180,
          scale:0,
          opacity:0,
        },
        {
          y:0,
          scale:1,
          opacity:1,
          duration:0.5,
          delay:0.3,
          scrollTrigger: {
            trigger: container.current, // watch this section
            start: "top 40%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      )

      // Cleanup on unmount
      return () => {
        video.removeEventListener("mousemove", handleMouseMove);
        video.removeEventListener("mouseenter", handleMouseEnter);
        video.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: container }
  );

  return (
    <Container>
      <div className="my-5">
        <h2 className="font-extrabold text-xl uppercase bg-green-800 text-white my-2">
          Popular destinations
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="relative" ref={container}>
            <div
              ref={cursorRef}
              className="absolute cursor-default pointer-events-none z-20 w-24 h-24 bg-black text-white rounded-full flex items-center justify-center"
            >
              <p className="font-bold">Read</p>
            </div>
            {/* <img
              ref={pictureRef}
              src="https://i.ibb.co/0y0Gy3fZ/airbnb-host-welcoming-guests.jpg"
              className="w-full lg:w-3/4 h-3/4 object-cover"
            /> */}

            <video
              autoPlay
              muted
              loop
              className="w-full lg:w-3/4 h-[500px] object-cover brightness-110 rounded-br-2xl"
              ref={videoRef}
            >
              <source src={articleVideo} />
            </video>
          </div>
          <div className="relative w-full h-3/4 object-cover flex flex-col justify-center gap-5">
            <PopularRooms />
            <Link
              to={`/rooms`}
              className="w-full btn px-8 py-2 bg-green-800 text-white cursor-pointer hover:bg-white hover:border-green-800 hover:text-green-800"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TopRooms;
