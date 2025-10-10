import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.css";
import "./Slide.css";
import Slide from "./Slide";

register();

const Banner = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const el = swiperRef.current;
    if (!el) return;

    Object.assign(el, {
      slidesPerView: 1,
      spaceBetween: 30,
      effect: "fade",
      pagination: { clickable: true },
      // Tell Swiper which elements to use (by selector)
      navigation: {
        nextEl: ".custom-swiper-button-next",
        prevEl: ".custom-swiper-button-prev",
      },
      // loop: true, // keep this OFF if you want hiding at ends
    });

    el.initialize?.();
  }, []);

  return (
    <div className="relative">
      <swiper-container ref={swiperRef} init="false" style={{ width: "100%" }}>
        <swiper-slide>
          <Slide
            bannerImg="https://i.ibb.co/m5N3HZtX/photo-1618221381711-42ca8ab6e908.jpg"
            btnText="Explore"
            bannerDescription="From cozy hideaways to vibrant city escapes, WanderStay helps you discover places that feel like home anywhere in the world."
          />
        </swiper-slide>

        <swiper-slide>
          <Slide
            bannerImg="https://i.ibb.co/XZB0j7Qr/banner-1.jpg"
            btnText="Explore"
            bannerDescription="Discover unique stays and hidden gems around the world. WanderStay makes your travel planning simple, inspiring, and unforgettable."
          />
        </swiper-slide>

        <swiper-slide>
          <Slide
            bannerImg="https://i.ibb.co/F1Zs6RB/photo-1615873968403-89e068629265.jpg"
            btnText="Explore"
            bannerDescription="Find comfort, adventure, and style — your next unforgettable stay starts here with WanderStay."
          />
        </swiper-slide>

        <swiper-slide>
          <Slide
            bannerImg="https://i.ibb.co/xqxwHSmk/photo-1601918774946-25832a4be0d6.jpg"
            btnText="Explore"
            bannerDescription="Where every journey feels like coming home — WanderStay connects you to spaces made for comfort, connection, and discovery."
          />
        </swiper-slide>

        {/* Place custom nav buttons INSIDE the container so selectors resolve.
            (Slots keep them visually above the slides.) */}
        <button
          className="custom-swiper-button-prev"
          slot="container-start"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="custom-swiper-button-next"
          slot="container-end"
          aria-label="Next"
        >
          ›
        </button>
      </swiper-container>
    </div>
  );
};

export default Banner;
