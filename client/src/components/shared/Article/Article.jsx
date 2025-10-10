import React from "react";
import Container from "../Container";
import { useRef } from "react";
import articleVideo from "../../../assets/videos/video1.mp4";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Article = () => {
  const mainContainerRef = useRef();
  const container = useRef();
  const cursorRef = useRef();
  const videoRef = useRef();
  const articleText = useRef();
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
          y: 180,
          scale: 0,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          scrollTrigger: {
            trigger: container.current, // watch this section
            start: "top 70%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );

      // Cleanup on unmount
      return () => {
        video.removeEventListener("mousemove", handleMouseMove);
        video.removeEventListener("mouseenter", handleMouseEnter);
        video.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: container }
  );

  useGSAP(
    (context, contextSafe) => {
      gsap.fromTo(
        articleText.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          stagger: 0.5,
          scrollTrigger: {
            trigger: mainContainerRef.current, // watch this section
            start: "top 40%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            // ↑ play when in view, reverse when leaving
          },
        }
      );
    },
    { scope: mainContainerRef }
  );
  return (
    <Container>
      <div className="my-5" ref={mainContainerRef}>
        <p className="text-xl font-medium text-white bg-green-800 px-2">
          Article
        </p>
        <div className="grid grid-cols-12 gap-3 my-2">
          <div className="col-span-12 md:col-span-6" ref={container}>
            <Link to={`/articles`}>
              <div
                ref={cursorRef}
                className="absolute cursor-default pointer-events-none z-20 w-24 h-24 bg-black text-white rounded-full flex items-center justify-center"
              >
                <p className="font-bold">Read Article</p>
              </div>
              <video
                autoPlay
                muted
                loop
                className="w-full h-[500px] object-cover brightness-110 rounded-tr-2xl rounded-br-4xl rounded-bl-2xl rounded-tl-0"
                ref={videoRef}
              >
                <source src={articleVideo} />
              </video>
            </Link>
          </div>
          <div
            className="col-span-12 md:col-span-6 flex flex-col items-center justify-center gap-3"
            ref={articleText}
          >
            <div className="text-center">
              <h1 className="uppercase text-5xl font-bold font-bebas tracking-wide">
                Travel Stories & Insights
              </h1>
              <p className="text-center">
                Dive into inspiring travel tales, destination highlights, and
                insider tips from hosts and guests across the world. Whether it
                is discovering hidden gems, learning how to create the perfect
                stay, or exploring local cultures, our articles bring you closer
                to the heart of travel. Stay curious, stay inspired - because
                every journey begins with a story worth sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Article;
