import React from "react";
import PropTypes from "prop-types"; // ES6
import { Link } from "react-router-dom";
import './Slide.css'
const Slide = ({ bannerImg, btnText, bannerDescription }) => {
  return (
    <div
      className="flex items-center justify-center px-6 py-4 mx-auto lg:h-[36rem] lg:py-16 bg-no-repeat bg-cover w-full"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="w-full h-1/2 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-lg text-center text-white font-semibold py-4">
          <p className="mt-4 relative inline-block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-green-800 to-white animate-shine">{bannerDescription}</p>
          <Link
            to={`/categories`}
            className="btn px-12 py-3 mt-6 text-sm font-medium shadow-none text-center text-white bg-green-800 rounded-lg border-transparent hover:text-green-800 hover:bg-white hover:border-green-800 duration-700"
          >
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  bannerImg: PropTypes.string,
  btnText: PropTypes.string,
  bannerDescription: PropTypes.string,
};
export default Slide;
