import React from "react";
import SliderCard from "./SliderCard";

const Slider = ({ room }) => {
  return (
      <SliderCard id={room?._id} img={room?.image} location={room?.location} rating={room?.rating?.score} title={room?.title}></SliderCard>
  );
};

export default Slider;
