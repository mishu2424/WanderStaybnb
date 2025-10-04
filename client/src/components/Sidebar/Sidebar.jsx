import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { BsFillHouseAddFill, BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { Navigate, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { MdHomeWork } from "react-icons/md";
import companyLogo from "../../assets/images/wanderstay.png";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../shared/LoadingSpinner";
import MenuItem from "./Menu/MenuItem";
import GuestMenu from "./Menu/GuestMenu";
import HostMenu from "./Menu/HostMenu";
import AdminMenu from "./Menu/AdminMenu";
import ToggleBtn from "../shared/Button/Togglebtn";
const Sidebar = () => {
  const { logOut } = useAuth();
  const [role, isLoading] = useRole();
  const [isActive, setActive] = useState(false);
  const [toggle, setToggle] = useState(true);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  // toggleBtn
  const toggleHandler = (e) => {
    console.log(e.target.checked);
    setToggle(!toggle);
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img className="w-10 h-10" src={companyLogo} alt="logo" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full flex px-4 py-2 rounded-lg justify-center items-center mx-auto">
              <Link to="/">
                <img
                  //   className='hidden md:block'
                  src={companyLogo}
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
            {role === "host" && <ToggleBtn toggleHandler={toggleHandler} />}
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              

              {role === "guest" && <GuestMenu />}
              {role === "host" ? (
                !toggle ? (
                  <HostMenu />
                ) : (
                  <GuestMenu />
                )
              ) : (
                <Navigate to="/dashboard" />
              )}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <MenuItem
            address={`/dashboard/profile`}
            label={"Profile"}
            icon={FcSettings}
          />

          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
