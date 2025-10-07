import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/pagination";
import "swiper/css/navigation";
import './Banner.css'

register();
import Slide from "./Slide";

const Banner = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      Object.assign(swiperRef.current, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: { clickable: true },
        navigation: true,
        effect:'fade',
        autoplay: {
        delay: 5000,   // time in ms between slides
        disableOnInteraction: true, // keeps autoplay running after manual nav
      },
      });
      swiperRef.current.initialize?.();
    }
  }, []);

  return (
    <>
      <swiper-container
        ref={swiperRef}
        init="false"
        style={{ display: "block", width: "100%" }}
      >
        <swiper-slide>
          <Slide
            bannerImg={"https://i.ibb.co/m5N3HZtX/photo-1618221381711-42ca8ab6e908.jpg"}
            btnText={"Explore"}
            bannerDescription={
              "From cozy hideaways to vibrant city escapes, WanderStay helps you discover places that feel like home anywhere in the world."
            }
          ></Slide>
        </swiper-slide>
        <swiper-slide>
          <Slide
            bannerImg={"https://i.ibb.co/XZB0j7Qr/banner-1.jpg"}
            btnText={"Explore"}
            bannerDescription={
              "Discover unique stays and hidden gems around the world. WanderStay makes your travel planning simple, inspiring, and unforgettable."
            }
          ></Slide>
        </swiper-slide>
        <swiper-slide>
          <Slide
            bannerImg={"https://i.ibb.co/F1Zs6RB/photo-1615873968403-89e068629265.jpg"}
            btnText={"Explore"}
            bannerDescription={
              "Find comfort, adventure, and style—your next unforgettable stay starts here with WanderStay."
            }
          ></Slide>
        </swiper-slide>
        <swiper-slide>
          <Slide
            bannerImg={"https://i.ibb.co/xqxwHSmk/photo-1601918774946-25832a4be0d6.jpg"}
            btnText={"Explore"}
            bannerDescription={
              "Where every journey feels like coming home - WanderStay connects you to spaces made for comfort, connection, and discovery."
            }
          ></Slide>
        </swiper-slide>
      </swiper-container>
    </>
  );
};

export default Banner;
