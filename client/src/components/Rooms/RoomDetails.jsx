import React from "react";
import {
  FaStar,
  FaRegClock,
  FaUsers,
  FaShower,
  FaBed,
  //   FaShieldAlt,
  FaWifi,
  FaUmbrellaBeach,
  FaDumbbell,
  //   FaSwimmer,
  FaTv,
  FaKitchenSet,
  FaElevator,
  //   FaCheckCircle,
  //   FaExclamationTriangle,
  FaLocationDot,
  FaCircleInfo,
  FaHeart,
  //   FaShareAlt,
} from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../shared/LoadingSpinner";
import Fact from "./Fact";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaShareAlt,
  FaShieldAlt,
  FaSwimmer,
} from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import RoomReservation from "./RoomReservation";
import Container from "../shared/Container";
import { useState } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAuth from "../../hooks/useAuth";

const amenityIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("wi-fi") || n.includes("wifi")) return <FaWifi />;
  if (n.includes("beach")) return <FaUmbrellaBeach />;
  if (n.includes("gym")) return <FaDumbbell />;
  if (n.includes("pool")) return <FaSwimmer />;
  if (n.includes("tv")) return <FaTv />;
  if (n.includes("kitchen") || n.includes("stovetop")) return <FaKitchenSet />;
  if (n.includes("elevator")) return <FaElevator />;
  if (n.includes("first aid")) return <FaCheckCircle />;
  if (n.includes("smoke")) return <FaExclamationTriangle />;
  if (n.includes("washer")) return <GiWashingMachine />;
  if (n.includes("air conditioning")) return <TbAirConditioning />;
  return <FaCircleInfo />;
};

export default function RoomDetailsCard() {
  const { user, loading } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { theme } = useAuth();
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();


  const closeModal = () => {
    setIsBookingModalOpen(false);
  };

  const {
    data: room = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const res = await axiosCommon(`room/${id}`);
      return res.data;
    },
  });

  if (isLoading||loading) return <LoadingSpinner />;
  const {
    location,
    category,
    title,
    from,
    to,
    price,
    guests,
    bathrooms,
    bedrooms,
    host,
    rating,
    facility = [],
    amenities = [],
    description,
    image,
    house_rules = [],
    cancellation_policy,
    cancellation_before,
    address_line,
  } = room || {};

  // console.log(room);
  return (
    <article className="shadow-sm bg-white overflow-hidden">
      {/* Header / media */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />
        {/* floating badges / actions */}
        <div className="absolute inset-x-0 top-0 p-4 flex items-start justify-between">
          <div className="flex gap-2">
            {category && (
              <span className="px-2.5 py-1 text-xs font-medium bg-black/60 text-white rounded-full backdrop-blur">
                {category}
              </span>
            )}
            {facility?.slice(0, 10).map((f) => (
              <span
                key={f}
                className="px-2.5 py-1 text-xs font-medium bg-white/80 text-gray-800 rounded-full backdrop-blur border"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 ">
            <button
              type="button"
              className="p-2 rounded-full bg-transparent border border-transparent group hover:bg-white"
              title="Save"
              aria-label="Save"
            >
              {bookmarked ? (
                // Filled heart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="z-50 w-6 h-6 text-red-500 cursor-pointer group-hover:text-red-500"
                  onClick={() => setBookmarked(false)}
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                // Outline heart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="z-50 w-6 h-6 text-white drop-shadow cursor-pointer group-hover:text-red-500"
                  onClick={() => setBookmarked(true)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="p-2 rounded-full bg-white"
              title="Share"
              aria-label="Share"
            >
              <FaShareAlt className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <Container>
        {/* Body */}
        <div className="p-5 md:p-6">
          {/* Title & rating */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div>
              <h1
                className={`text-lg md:text-xl font-semibold leading-tight ${
                  theme === "night" && `text-black`
                }`}
              >
                {title}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <FaLocationDot />
                  {location}
                </span>
                <span>•</span>
                <span className="truncate">{address_line}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center text-yellow-500">
                <FaStar className="w-4 h-4" />
                <span className="ml-1 font-medium">
                  {Number(rating?.score || 0).toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                ({rating?.reviews || 0} reviews)
              </span>
            </div>
          </div>

          {/* Quick facts */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <Fact icon={<FaUsers />} label={`${guests} Guests`} />
            <Fact icon={<FaBed />} label={`${bedrooms} Bedroom`} />
            <Fact icon={<FaShower />} label={`${bathrooms} Bath`} />
            <Fact
              icon={<FaRegClock />}
              label={`Check-in 12:00PM • Out 11:00AM`}
            />
          </div>

          {/* Host */}
          <div className="mt-5 flex items-center gap-3 p-3 border rounded-xl">
            <img
              src={host?.img}
              alt={host?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className={`font-medium truncate ${
                    theme === "night" && `text-black`
                  }`}
                >
                  Hosted by {host?.name}
                </p>
                {host?.isSuperhost && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Superhost
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600">
                {host?.languages?.join(", ")} • Response {host?.response_rate},{" "}
                {host?.response_time}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-gray-700">{description}</p>

          {/* Amenities */}
          <section className="mt-6">
            <h2
              className={`text-sm font-semibold mb-3 ${
                theme === "night" && `text-black`
              }`}
            >
              What this place offers
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {amenities.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="text-gray-700">{amenityIcon(a)}</span>
                  {a}
                </li>
              ))}
            </ul>
          </section>

          {/* Stay details */}
          <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 border rounded-xl col-span-2">
              <h3
                className={`text-sm font-semibold mb-2 ${
                  theme === "night" && `text-black`
                }`}
              >
                House rules
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {house_rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className="mt-3 text-sm text-gray-700">
                <span className="font-semibold">Cancellation:</span>{" "}
                {cancellation_policy} {cancellation_before}
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-gray-600" />
                <span
                  className={`text-sm ${theme === "night" && `text-black`}`}
                >
                  24/7 security on site
                </span>
              </div>
            </div>
            <div className="col-span-1 w-80">
              <RoomReservation
                bookingInfo={{ ...room }}
                closeModal={closeModal}
                setIsBookingModalOpen={setIsBookingModalOpen}
                isOpen={isBookingModalOpen}
              />
            </div>
          </section>
        </div>
      </Container>
    </article>
  );
}
