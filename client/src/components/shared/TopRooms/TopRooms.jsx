import companyLogo from "../../../assets/images/wanderstay.png";
import Container from "../Container";
import PopularRooms from "./PopularRooms";
const TopRooms = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <div className="">
          <img src={companyLogo} className="w-full lg:w-3/4 h-3/4 object-cover"/>
        </div>
      <div className="relative w-full h-3/4 object-cover flex items-center justify-center">
            <PopularRooms/>
        </div>
      </div>
    </Container>
  );
};

export default TopRooms;
