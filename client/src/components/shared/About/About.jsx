import companyLogo from "../../../assets/images/Home Icon.json";
import Container from "../Container";
import Lottie from "lottie-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAuth from "../../../hooks/useAuth";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { theme } = useAuth();
  const container = useRef();
  const textBoxRef = useRef(); // wrapper for the paragraph
  const lottieRef = useRef();

  useGSAP(
    () => {
      // --- Lottie entrance ---
      gsap.fromTo(
        lottieRef.current,
        { opacity: 0, scale: 0.9, y: -40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // --- Word-by-word typing effect (no SplitText needed) ---
      const p = textBoxRef.current.querySelector("[data-words]");
      const original = p.textContent; // keep the text
      const words = original.trim().split(/\s+/);

      // rebuild innerHTML with span per word (keep spaces)
      p.innerHTML = words
        .map(
          (w) =>
            `<span class="ws-word inline-block opacity-0 translate-y-2">${w}&nbsp;</span>`
        )
        .join("");

      const wordEls = p.querySelectorAll(".ws-word");

      gsap.to(wordEls, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        delay: 0.5,
        duration: 0.5,
        stagger: 0.06, // ← controls speed (smaller = faster)
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <Container>
      <div
        ref={container}
        className="flex flex-col items-center justify-center mt-10 mb-20"
      >
        <div className="col-span-2" ref={lottieRef}>
          <Lottie
            animationData={companyLogo}
            loop
            className={`w-1/2 h-1/2 mx-auto md:w-72 md:h-1/2 ${
              theme === "night" && `bg-white mb-2`
            }`}
          />
        </div>

        <div ref={textBoxRef} className="max-w-3xl px-4">
          <p data-words className="text-center italic">
            🌍✨ WanderStay is your gateway to unique stays and unforgettable
            travel experiences. From cozy hideaways to luxury escapes, we make
            it simple to discover, book, and enjoy places that feel like home
            anywhere in the world. Whether you are chasing adventure,
            relaxation, or culture, WanderStay helps you find the perfect stay
            for every journey.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default About;
