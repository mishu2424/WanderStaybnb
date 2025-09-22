import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";

const SliderCard = ({ id, img, location, rating, title }) => {

  return (
    <Link to={`/room/${id}`}>
      <div className="relative">
        <img className="w-full h-full" src={img} alt={title} />
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold">{location}</h4>
          <div className="flex items-center gap-1">
            <h6 className="text-sm font-thin">{rating}</h6>
            <Rating style={{ maxWidth: 50 }} value={rating} readOnly />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SliderCard;
