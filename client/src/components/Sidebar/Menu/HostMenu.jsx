import { BsFillHouseAddFill, BsGraphUp } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const HostMenu = () => {
  return (
    <>
      {/* Statistics */}
      <MenuItem
        address={`/dashboard/host-stats`}
        label={"Statistics"}
        icon={BsGraphUp}
      />
      <MenuItem icon={BsFillHouseAddFill} label="Add Room" address="add-room" />
      <MenuItem icon={MdHomeWork} label="My Listings" address="my-listings" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Bookings"
        address="manage-bookings"
      />
    </>
  );
};

export default HostMenu;
