import React from "react";
import PropTypes from "prop-types"; // ES6
import { Link } from "react-router-dom";
import "./Slide.css";
import { Parallax } from "react-parallax";
import { useRef } from "react";
import { ReactTyped } from "react-typed";
import Container from "../Container";

const Slide = ({ bannerImg, btnText, bannerDescription }) => {
  const bannerText = useRef();
  return (
    <>
      <Container>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div> */}
        <Parallax
          blur={{ min: -20, max: 20 }}
          bgImage={bannerImg}
          bgImageAlt={"banner image"}
          strength={200}
          className="flex items-center justify-center px-6 py-0 h-[24rem] lg:h-[42rem] lg:py-16 bg-no-repeat bg-cover w-full rounded-3xl md:mt-2"
        >
          {/* <div
      className="flex items-center justify-center px-6 py-4 mx-auto h-screen lg:h-[37.5rem] lg:py-16 bg-no-repeat bg-cover w-full"
      style={{ backgroundImage: `url(${bannerImg})` }}
    > */}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-2xl"></div>
          <div className="relative z-10 w-3/4 mx-auto md:w-full h-3/4 lg:w-full flex items-center justify-center">
            <div className="max-w-lg text-center text-white font-semibold py-4 bg-white brightness-100 rounded-2xl p-5">
              <p
                ref={bannerText}
                className="text-sm md:text-lg relative font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-green-800 to-white animate-shine"
              >
                <ReactTyped strings={[bannerDescription]} typeSpeed={30} />
              </p>
              <Link
                to={`/rooms`}
                className="btn flex items-center text-sm md:text-lg px-12 py-3 mt-6 font-medium shadow-none text-center text-white bg-green-800 rounded-lg border-transparent hover:text-green-800 hover:bg-white hover:border-green-800 duration-700"
              >
                <span>{btnText}</span>
              </Link>
            </div>
          </div>
          {/* </div> */}
        </Parallax>
      </Container>
    </>
  );
};

Slide.propTypes = {
  bannerImg: PropTypes.string,
  btnText: PropTypes.string,
  bannerDescription: PropTypes.string,
};
export default Slide;
