import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../LoadingSpinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Link } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";

const PopularRooms = () => {
  const axiosCommon = useAxiosCommon();

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["popular-rooms"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/rooms?popular=${true}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full flex justify-center">
      <Swiper
        effect="cards"
        grabCursor
        modules={[EffectCards]}
        // 👇 give the swiper a predictable size (cards effect needs it)
        className="mySwiper w-[320px] h-[420px] md:w-[360px] md:h-[480px]"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room._id}>
            {/* slide content */}
            <div className="block w-full h-full">
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full group-hover:scale-105 duration-700 object-cover brightness-95 hover:brightness-75"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/45 text-white p-3">
                  <p className="text-sm font-semibold line-clamp-1">
                    {room.title}
                  </p>
                  <p className="text-xs opacity-90 line-clamp-1">
                    {room.location}
                  </p>
                </div>
                <Link
                  to={`/room/${room?._id}`}
                  className="absolute left-1/2 
      -translate-x-1/2 -translate-y-1/2
      -top-1/2 group-hover:top-1/2
      bg-transparent border border-green-800 text-white
      px-4 py-2 rounded-lg shadow-md cursor-pointer
      hover:bg-green-800 hover:text-white
      transition-all duration-500 ease-in-out flex items-center gap-2 font-semibold"
                >
                  Details{" "}
                  <FaCircleArrowRight className="hover:text-green-800" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularRooms;
