import companyLogo from "../../../assets/images/Home Icon.json";
import Container from "../Container";
import Lottie from "lottie-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const About = () => {
  const container = useRef();
  const goodRef = useRef();
  const lottieRef = useRef();

  useGSAP(
    (context, contextSafe) => {
      gsap.fromTo(
        goodRef.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          stagger: 0.5,
          scrollTrigger: {
            trigger: container.current, // watch this section
            start: "top 50%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );

      gsap.fromTo(
        lottieRef.current,
        {
          opacity: 0,
          scale: 0,
          y:-40,
        },
        {
          y:0,
          scale: 1,
          opacity: 1,
          delay: 0.4,
          duration: 0.5,
          scrollTrigger: {
            trigger: container.current, // watch this section
            start: "top 50%", // when top of section hits 80% of viewport
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
      <div
        className="flex flex-col items-center justify-center mt-10 mb-20"
        ref={container}
      >
        <div className="col-span-2" ref={lottieRef}>
          {/* <img src={companyLogo} alt="company logo" className="w-1/2 h-1/2 mx-auto md:w-72 md:h-1/2" /> */}
          <Lottie
            animationData={companyLogo}
            loop={true}
            className="w-1/2 h-1/2 mx-auto md:w-72 md:h-1/2 "
          ></Lottie>
        </div>
        <div className="" ref={goodRef}>
          <p className="text-center italic font-semibold">
            🌍✨ "WanderStay is your gateway to unique stays and unforgettable
            travel experiences. From cozy hideaways to luxury escapes, we make
            it simple to discover, book, and enjoy places that feel like home
            anywhere in the world. Whether you are chasing adventure,
            relaxation, or culture, WanderStay helps you find the perfect stay
            for every journey."
          </p>
        </div>
      </div>
    </Container>
  );
};

export default About;
