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
          <div className="relative w-full h-3/4 object-cover flex items-center justify-center">
            <PopularRooms />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TopRooms;
