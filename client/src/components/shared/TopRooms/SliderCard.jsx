import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import './SliderCard.css'
const SliderCard = ({ room }) => {
  return (
    <SwiperSlide>
      <Link to={`/room/${room?._id}`}>
        <div className="relative group">
          <div className="overflow-hidden">
            <img
              className="w-full h-full group-hover:scale-110 duration-500"
              src={room?.image}
              alt={room?.title}
            />
          </div>
          {/* <div className="flex items-center justify-between">
            <h4 title={location} className="text-base font-bold">
              {location.slice(0, 20) + "..."}
            </h4>
            <div className="flex items-center gap-1">
              <h6 className="text-sm font-thin">{rating}</h6>
              <Rating style={{ maxWidth: 50 }} value={rating} readOnly />
            </div>
          </div> */}
        </div>
      </Link>
    </SwiperSlide>
  );
};

export default SliderCard;
