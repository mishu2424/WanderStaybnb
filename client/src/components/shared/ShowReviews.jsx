import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Container from "./Container";
import { format } from "date-fns";

// const CustomLeftArrow = ({ onClick, hovered }) => (
//   <button
//     onClick={onClick}
//     className={`hidden lg:flex
//         absolute bottom-35 right-[45%] transform -translate-y-1/2
//         bg-white text-blue-600  p-2 rounded-full z-10
//         transition-all duration-500 ease-in-out cursor-pointer
//         ${hovered ? "right-10 opacity-100" : "-right-20 opacity-0"}
//       `}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-6 h-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M15 19l-7-7 7-7"
//       />
//     </svg>
//   </button>
// );

// const CustomRightArrow = ({ onClick, hovered }) => (
//   <button
//     onClick={onClick}
//     className={`hidden lg:flex
//         absolute bottom-35 right-[40%] transform -translate-y-1/2
//         bg-white text-blue-600 p-2 rounded-full z-10
//         transition-all duration-500 ease-in-out cursor-pointer
//         ${hovered ? "right-4 opacity-100" : "-right-20 opacity-0"}
//       `}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-6 h-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 5l7 7-7 7"
//       />
//     </svg>
//   </button>
// );

const ShowReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [hovered, setHovered] = useState(false);
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["show-reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-reviews`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (reviews.length > 0) {
    return (
      <>
        <Container>
            <p className="text-xl font-medium text-white bg-green-800 px-2">
          Reviews
        </p>
        <div
          className="relative container mx-auto"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Carousel
            additionalTransfrom={0}
            centerMode={false}
            arrows
            // customLeftArrow={<CustomLeftArrow hovered={hovered} />}
            // customRightArrow={<CustomRightArrow hovered={hovered} />}
            autoPlay
            autoPlaySpeed={7000}
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 1,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 1,
              },
            }}
            rewind
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {reviews.map((review) => (
              <section key={review?._id} className="bg-white dark:bg-gray-900">
                <div className="max-w-6xl px-6 py-10 mx-auto">
                  <h1 className="text-xl font-extrabold lg:text-xl 2xl:text-2xl bg-clip-text animate-gradient">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
                      What clients
                    </span>

                    <span className="pl-2 text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
                      are saying
                    </span>
                  </h1>

                  <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-">
                    <div className="absolute w-full bg-green-800 -z-10 md:h-96 rounded-2xl"></div>

                    <div className="w-full p-6 bg-green-800 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                      <img
                        className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                        src={review?.user?.photoURL}
                        alt="client photo"
                      />

                      <div className="mt-2 md:mx-6 p-10">
                        <div>
                          <p className="text-xl font-medium tracking-tight text-white">
                            {review?.user?.name} 
                            <span className="text-sm text-gray-200 pl-2">({format(new Date(review?.date), "MM/dd/yyyy")})</span>
                          </p>
                          <p className="text-gray-200">{review?.user?.email}</p>
                        </div>

                        <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                          “{review?.comment?.substring(0, 200)}”.
                        </p>

                        {/* <div className="flex items-center justify-between mt-6 md:justify-start">
                      <button
                        title="left arrow"
                        className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      <button
                        title="right arrow"
                        className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div> */}
                      </div>
                    </div>
                  </main>
                </div>
              </section>
            ))}
          </Carousel>
        </div>
        </Container>
      </>
    );
  } else {
    return <></>;
  }
};

export default ShowReviews;
