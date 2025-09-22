import { Link } from "react-router-dom";
import companyLogo from "../../../assets/images/wanderstay.png";
import Container from "../Container";
import PopularRooms from "./PopularRooms";
const TopRooms = () => {
  return (
    <Container>
      <div className="m-10">
        <h2 className="font-extrabold text-3xl uppercase">
          Popular destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <img
              src="https://i.ibb.co/0y0Gy3fZ/airbnb-host-welcoming-guests.jpg"
              className="w-full lg:w-3/4 h-3/4 object-cover"
            />
          </div>
          <div className="relative w-full h-3/4 object-cover flex flex-col justify-center gap-5">
            <PopularRooms />
            <Link to={`/rooms`} className="w-full btn px-8 py-2 bg-green-800 text-white cursor-pointer hover:bg-white hover:border-green-800 hover:text-green-800">
                Explore More
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TopRooms;
