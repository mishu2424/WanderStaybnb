import React, { useRef } from "react";
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
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../shared/LoadingSpinner";
import { IoShareSocialOutline } from "react-icons/io5";
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
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useBookmarks from "../../hooks/useBookmarks";
import { destroy } from "splash-screen";
import { useEffect } from "react";
import RoomMap from "../Roommap";
import RoomReview from "../shared/RoomReview";
import ShowRoomReviews from "../shared/ShowRoomReviews";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
import ShareCardModal from "../Modal/ShareCardModal";

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

gsap.registerPlugin(ScrollTrigger);

export default function RoomDetailsCard() {
  const { user: loggedInUser, loading } = useAuth();
  const [roomRev, setReview] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const container1 = useRef();
  const container2 = useRef();
  const container3 = useRef();
  const container4 = useRef();
  const firstInfo = useRef();
  const firstInfo1 = useRef();
  const firstInfo2 = useRef();
  const firstInfo3 = useRef();
  const firstInfo4 = useRef();
  const firstInfo5 = useRef();
  const firstInfo6 = useRef();
  const firstInfo7 = useRef();
  const reviewsRef = useRef();
  const { theme } = useAuth();
  const { id } = useParams();
  const lenis = useLenis();
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const location = useLocation();

  // console.log(location.pathname);
  // const [params, setParams] = useSearchParams();
  // const review = params.get("review");
  // useEffect(() => {
  //   if (review) {
  //     setReview(true);
  //   } else {
  //     setReview(false);
  //   }
  // }, [review]);
  const navigate = useNavigate();

  // When you navigate back to Home, refresh trigger positions once it renders.
  useEffect(() => {
    // wait one frame for layout to settle (images, fonts, etc.)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);
  const closeModal = () => {
    setIsBookingModalOpen(false);
  };

  const closeShareModal = () => {
    setIsOpen(false);
  };

  // gsap
  useGSAP(
    (context, contextSafe) => {
      gsap.fromTo(
        firstInfo.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          scrollTrigger: {
            trigger: container1.current, // watch this section
            start: "top 90%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );

      // --- Word-by-word typing effect (no SplitText needed) ---

      gsap.fromTo(
        firstInfo1.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          scrollTrigger: {
            trigger: container1.current, // watch this section
            start: "top 90%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
      gsap.fromTo(
        firstInfo2.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          scrollTrigger: {
            trigger: container1.current, // watch this section
            start: "top 90%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
      gsap.fromTo(
        firstInfo3.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          scrollTrigger: {
            trigger: container1.current, // watch this section
            start: "top 90%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
      gsap.fromTo(
        firstInfo4.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          scrollTrigger: {
            trigger: container1.current, // watch this section
            start: "top 90%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
    },
    { scope: container1 }
  );
  useGSAP(
    (context, contextSafe) => {
      gsap.fromTo(
        firstInfo6.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          scrollTrigger: {
            trigger: container3.current, // watch this section
            start: "top 50%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
      gsap.fromTo(
        firstInfo7.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          scrollTrigger: {
            trigger: container3.current, // watch this section
            start: "top 50%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
    },
    { scope: container3 }
  );

  useGSAP(
    (context, contextSafe) => {
      gsap.fromTo(
        firstInfo5.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          scrollTrigger: {
            trigger: container4.current, // watch this section
            start: "top 90%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
    },
    { scope: container4 }
  );

  const {
    data: room = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const res = await axiosCommon(`/room/${id}`);
      // destroy();
      return res.data;
    },
  });

  // console.log(room);

  const { mutateAsync: postRoomReviewAsync, isPending } = useMutation({
    mutationKey: ["room-review"],
    mutationFn: async (reviewPost) => {
      const { data } = await axiosSecure.post(`/room-review`, reviewPost);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["show-room-reviews"] });
    },
  });

  const handleRoomReview = async (e) => {
    e.preventDefault();

    if (!loggedInUser?.email) {
      // redirect to login and remember where user came from
      navigate("/login", { replace: true, state: { from: location } });
      return;
    }

    if (loggedInUser?.email === room?.host?.email) {
      return toast.error("Host cannot rate his own room");
    }

    const form = new FormData(e.target);
    const comment = form.get("comment");
    const rating = Number(form.get("rating-2"));
    const date = new Date().toISOString();

    try {
      const user = {
        name: loggedInUser?.displayName,
        email: loggedInUser?.email,
        photoURL: loggedInUser?.photoURL,
      };
      const reviewPost = {
        user,
        comment,
        rating,
        date,
        roomId: room?._id,
        roomImg: room?.image,
        roomTitle: room?.title,
      };
      await postRoomReviewAsync(reviewPost);
      toast.success("Thank you for your review!!!");
      e.target.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutateAsync: mutateBookMark } = useMutation({
    mutationKey: ["bookmarked-room"],
    mutationFn: async (bookmarkedRoom) => {
      const { data } = await axiosSecure.post("/bookmarks", bookmarkedRoom);
      return data;
    },
  });

  const { mutateAsync: deleteBookMark } = useMutation({
    mutationKey: ["remove-bookmarked-room"],
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/bookmarks/${id}`);
      return data;
    },
  });

  const handleBookMarks = async () => {
    if (!bookmarked) {
      const guest = {
        email: loggedInUser?.email,
        name: loggedInUser?.displayName,
        photoURL: loggedInUser?.photoURL,
      };
      const bookmarkedRoom = {
        ...room,
        roomId: room?._id,
        bookmarked: true,
        guest,
      };
      delete bookmarkedRoom?._id;
      try {
        await mutateBookMark(bookmarkedRoom);
        toast.success(`This room has been booked`);
        setBookmarked(true);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      await deleteBookMark(room?._id);
      // console.log(room?._id);
      toast.success("Bookmark has been removed");
      setBookmarked(false);
    }
  };

  // console.log('room id',room?._id);
  const [isBookMarked, bookMarkLoading] = useBookmarks(room?._id);
  const [bookmarked, setBookmarked] = useState(isBookMarked);
  useEffect(() => {
    setBookmarked(isBookMarked);
  }, [isBookMarked]);
  // console.log(bookmarked);

  if (isLoading || loading || bookMarkLoading || isPending)
    return <LoadingSpinner />;

  const {
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
    <article className="shadow-sm overflow-hidden">
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
              onClick={handleBookMarks}
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
                  // onClick={() => setBookmarked(false)}
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
                  // onClick={() => setBookmarked(true)}
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
              onClick={() => setIsOpen(true)}
              type="button"
              className="p-2 rounded-full bg-white"
              title="Share"
              aria-label="Share"
            >
              <IoShareSocialOutline className="w-4 h-4" />
            </button>
            <ShareCardModal closeShareModal={closeShareModal} isOpen={isOpen} />
          </div>
        </div>
      </div>

      <Container>
        {/* Body */}
        <div className="p-5 md:p-6" ref={container1}>
          {/* Title & rating */}
          <div
            className={`flex flex-col md:flex-row md:items-start md:justify-between gap-3 ${
              theme === "night" && `text-white`
            }`}
          >
            <div ref={firstInfo}>
              <h1
                className={`text-lg md:text-xl font-semibold leading-tight ${
                  theme === "night" && `text-white`
                }`}
              >
                {title}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span
                  className={`inline-flex items-center gap-1 ${
                    theme === "night" && `text-white`
                  }`}
                >
                  <FaLocationDot />
                  {room?.location}
                </span>
                <span>•</span>
                <span
                  className={`${theme === "night" && `text-white`} truncate`}
                >
                  {address_line}
                </span>
              </div>
            </div>
            <div ref={firstInfo1} className="flex items-center gap-2 shrink-0">
              <div className="flex items-center text-yellow-500">
                <FaStar className="w-4 h-4" />
                <span className="ml-1 font-medium">
                  {Number(rating?.score || 0).toFixed(1)}
                </span>
              </div>
              <button
                disabled={!rating?.count}
                type="button"
                onClick={() => {
                  if (!reviewsRef.current) return;
                  if (rating?.count == 0) return;
                  lenis?.scrollTo(reviewsRef.current, {
                    // adjust if you have a sticky navbar
                    offset: -80,
                    duration: 1.1,
                    easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
                  });
                }}
                className={`text-sm disabled:text-gray-200 link link-hover hover:text-blue-500 text-gray-600`}
              >
                ({rating?.count || 0} reviews)
              </button>
            </div>
          </div>

          {/* Quick facts */}
          <div
            ref={firstInfo2}
            className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm"
          >
            <Fact icon={<FaUsers />} label={`${guests} Guests`} />
            <Fact icon={<FaBed />} label={`${bedrooms} Bedroom`} />
            <Fact icon={<FaShower />} label={`${bathrooms} Bath`} />
            <Fact
              icon={<FaRegClock />}
              label={`Check-in 12:00PM • Out 11:00AM`}
            />
          </div>

          {/* Host */}
          <div
            ref={firstInfo3}
            className="mt-5 flex items-center gap-3 p-3 border rounded-xl"
          >
            <img
              src={host?.img}
              alt={host?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className={`font-medium truncate ${
                    theme === "night" && `text-white`
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
          <p
            ref={firstInfo4}
            className={`${
              theme === "night" && `text-white`
            } mt-5 text-gray-700`}
          >
            {description}
          </p>

          {/* Amenities */}
          <section ref={container4} className="mt-6">
            <div ref={firstInfo5}>
              <h2
                className={`text-sm font-semibold mb-3 ${
                  theme === "night" && `text-white`
                }`}
              >
                What this place offers
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {amenities.map((a) => (
                  <li
                    key={a}
                    className={`flex items-center gap-2 text-sm text-gray-700 ${
                      theme === "night" && `text-white`
                    }`}
                  >
                    <span className="text-gray-700">{amenityIcon(a)}</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Stay details */}
          <section
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3"
            ref={container3}
          >
            <div ref={firstInfo6} className="p-4 border rounded-xl col-span-2">
              <h3
                className={`text-sm font-semibold mb-2 ${
                  theme === "night" && `text-white`
                }`}
              >
                House rules
              </h3>
              <ul
                className={`${
                  theme === "night" && `text-white`
                } list-disc list-inside text-sm text-gray-700 space-y-1`}
              >
                {house_rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div
                className={`${
                  theme === "night" && `text-white`
                } mt-3 text-sm text-gray-700`}
              >
                <span className="font-semibold">Cancellation:</span>{" "}
                {cancellation_policy} {cancellation_before}
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-gray-600" />
                <span
                  className={`text-sm ${theme === "night" && `text-white`}`}
                >
                  24/7 security on site
                </span>
              </div>
            </div>
            <div ref={firstInfo7} className="col-span-1 w-80">
              <RoomReservation
                bookingInfo={{ ...room }}
                closeModal={closeModal}
                setIsBookingModalOpen={setIsBookingModalOpen}
                isOpen={isBookingModalOpen}
              />
            </div>
          </section>
        </div>
        <div ref={container2}>
          <RoomMap location={room?.location} />
        </div>
        <div ref={reviewsRef}>
          <ShowRoomReviews id={id} />
        </div>
        {roomRev && <RoomReview handleRoomReview={handleRoomReview} />}
      </Container>
    </article>
  );
}
