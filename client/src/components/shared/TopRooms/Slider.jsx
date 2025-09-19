import React from "react";
import SliderCard from "./SliderCard";

const Slider = ({ room }) => {
  return (
      <SliderCard img={room?.image} location={room?.location} rating={room?.rating?.score} title={room?.title}></SliderCard>
  );
};

export default Slider;
