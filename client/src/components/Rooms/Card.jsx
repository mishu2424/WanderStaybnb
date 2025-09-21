import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Card = ({ room }) => {
  const { _id: id, location, image, title, rating, price, amenities } = room;
  return (
    <article className="relative rounded-2xl shadow-sm  bg-white overflow-hidden hover:shadow-md hover:scale-105 duration-300">
      <Link to={`/room/${id}`}>
        <div className="relative group cursor-pointer">
          <img
            src={image}
            alt={title}
            className="w-full h-44 object-cover group-hover:scale-105 hover:brightness-70 duration-500"
            loading="lazy"
          />
          {/* Centered overlay button */}
          <button
            className="
        absolute left-1/2 
      -translate-x-1/2 -translate-y-1/2
      -top-1/2 group-hover:top-1/2
      bg-transparent border border-green-800 text-white
      px-4 py-2 rounded-lg shadow-md cursor-pointer
      hover:bg-green-700 hover:text-white
      transition-all duration-500 ease-in-out
          "
          >
            Room Details
          </button>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-semibold text-[15px] tracking-wide uppercase truncate"
            title={title}
          >
            {title}
          </h3>
        </div>

        <p className="mt-1 text-sm text-gray-600">{location}</p>
        <p className="mt-1 text-sm text-gray-600">
          {amenities[0]}, {amenities[1]}
        </p>

        <div className="flex items-center justify-between">
          <p className="mt-3 text-lg font-semibold">${price}</p>
          <div className="text-gray-800 flex items-center gap-1">
            <ReactStars
              count={5}
              size={10}
              isHalf={true}
              value={rating?.score || 0}
              emptyIcon={
                <FaStar className="text-gray-300" />
              } // Empty stars
              halfIcon={
                <FaStarHalfAlt className="text-yellow-500" />
              } // Half stars
              filledIcon={
                <FaStar className="text-yellow-500" />
              } // Full stars
              activeColor="text-yellow-500"
            />
            <span className="text-xs font-medium">
              {Number(rating?.score || 0).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
