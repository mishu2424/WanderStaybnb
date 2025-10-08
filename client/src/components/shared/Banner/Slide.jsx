import React from "react";
import PropTypes from "prop-types"; // ES6
import { Link } from "react-router-dom";
import "./Slide.css";
import { Parallax } from "react-parallax";
import { useRef } from "react";

const Slide = ({ bannerImg, btnText, bannerDescription }) => {
  const bannerText=useRef();
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      <Parallax
        blur={{ min: -20, max: 20 }}
        bgImage={bannerImg}
        bgImageAlt={"banner image"}
        strength={200}
        className="flex items-center justify-center px-6 py-4 mx-auto h-screen lg:h-[42rem] lg:py-16 bg-no-repeat bg-cover w-full"
      >
        {/* <div
      className="flex items-center justify-center px-6 py-4 mx-auto h-screen lg:h-[37.5rem] lg:py-16 bg-no-repeat bg-cover w-full"
      style={{ backgroundImage: `url(${bannerImg})` }}
    > */}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-2xl"></div>
        <div className="relative z-10 w-full h-1/2 lg:w-full flex items-center justify-center">
          <div className="max-w-lg text-center text-white font-semibold py-4 bg-white brightness-100 rounded-2xl p-5">
            <p ref={bannerText} className="text-sm leading-5 tracking-wide md:text-lg relative inline-block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-green-800 to-white animate-shine">
              {bannerDescription}
            </p>
            <Link
              to={`/rooms`}
              className="btn text-sm md:text-lg px-12 py-3 mt-6 font-medium shadow-none text-center text-white bg-green-800 rounded-lg border-transparent hover:text-green-800 hover:bg-white hover:border-green-800 duration-700"
            >
              {btnText}
            </Link>
          </div>
        </div>
        {/* </div> */}
      </Parallax>
    </>
  );
};

Slide.propTypes = {
  bannerImg: PropTypes.string,
  btnText: PropTypes.string,
  bannerDescription: PropTypes.string,
};
export default Slide;
