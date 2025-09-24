import { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "@tanstack/react-query";
import Slider from "./Slider";
import LoadingSpinner from "../LoadingSpinner";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
const PopularRooms = () => {
  const axiosCommon = useAxiosCommon();
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["popular-rooms"],
    queryFn: async () => {
      const { data } = await axiosCommon("/rooms");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass="px-4"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 1,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {rooms.map((room, id) => (
        <Slider room={room} key={id}></Slider>
      ))}
    </Carousel>
  );
};

export default PopularRooms;
