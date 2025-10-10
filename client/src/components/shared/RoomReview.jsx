import React, { useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const RoomReview = ({ handleRoomReview }) => {
  const container = useRef();
  const reviewRef = useRef();
  const reviewBox = useRef();

  useGSAP(
    (context, contextSafe) => {
      gsap.fromTo(
        reviewRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          stagger: 0.5,
          scrollTrigger: {
            trigger: container.current, // watch this section
            start: "top 70%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
      gsap.fromTo(
        reviewBox.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.6,
          stagger: 0.5,
          scrollTrigger: {
            trigger: container.current, // watch this section
            start: "top 70%", // when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
            // ↑ play when in view, reverse when leaving
          },
        }
      );
    },
    { scope: container }
  );
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center gap-3 my-3"
      ref={container}
    >
      <div ref={reviewBox} className="flex-2 flex flex-col min-w-xl max-w-2xl p-8 shadow-none md:shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-3xl font-semibold text-center">
            Your opinion matters!
          </h2>
          <form onSubmit={handleRoomReview}>
            <div className="flex flex-col items-center py-6 space-y-3">
              <span className="text-center">How was your experience?</span>
              <div className="flex items-center gap-3">
                <label className="font-semibold">Rating:</label>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    aria-label="1 star"
                    value={1}
                    required
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    aria-label="2 star"
                    value={2}
                    //   defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    aria-label="3 star"
                    value={3}
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    aria-label="4 star"
                    value={4}
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    aria-label="5 star"
                    value={5}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-72 md:w-96">
              <textarea
                rows="3"
                name="comment"
                placeholder="Message..."
                className="p-4 rounded-md border border-gray-200 resize-none dark:text-gray-800 dark:bg-gray-50"
              ></textarea>
              <button
                type="submit"
                className="btn border bg-green-800 text-white py-4 my-8 font-semibold rounded-md hover:text-green-800 hover:bg-white hover:border-green-800 dark:text-gray-50 dark:bg-violet-600"
              >
                Leave feedback <IoMdSend />
              </button>
            </div>
          </form>
        </div>
        {/* <div className="flex items-center justify-center">
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-sm dark:text-gray-600"
          >
            Maybe later
          </a>
        </div> */}
      </div>
      <div
        ref={reviewRef}
        className="relative flex-1 flex flex-col items-center gap-3 justify-center"
      >
        <h1 className="uppercase text-5xl font-bold font-bebas tracking-wide">
          Leave a Little Love 💬
        </h1>
        <p className="text-center">
          Enjoyed your stay? Please let us know! Your reviews and ratings
          inspire hosts, guide travelers, and keep the WanderStay community
          growing strong.
        </p>
      </div>
    </div>
  );
};

export default RoomReview;
