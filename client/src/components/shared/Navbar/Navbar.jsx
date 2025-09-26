import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/wanderstay.png";
// import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import avatarImg from "../../../assets/images/placeholder.jpg";
import useAuth from "../../../hooks/useAuth";
import HostModal from "../../Modal/HostModal";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const Navbar = ({ path }) => {
  const { user, logOut, theme, setTheme } = useAuth();
  const [time, setTime] = useState(null);
  const axiosSecure=useAxiosSecure();
  const [isOpen, setIsOpen]=useState(false);

  const closeModal=()=>{
    setIsOpen(false);
  }

  const handleHostRequest=async()=>{
    try{
      const newUser={
        email:user?.email,
        name:user?.displayName,
        role:"guest",
        status:"Requested",
      }
      const {data}=await axiosSecure.put('/users',newUser);
      if(data.modifiedCount>0){
        return toast.success('Host request has been sent!')
      }else{
        return toast.success("Request had already been made! Please wait for admin approval!");
      }
    }catch(err){
      toast.error(err.message);
    }finally{
      closeModal();
    }
  }

  useEffect(() => {
    const LTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", LTheme);
    setTheme(LTheme);
    // Set the toggle switch based on theme
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.checked = LTheme === "night";
    }
  }, [theme]);

  const handleTheme = (e) => {
    if (e.target.checked) {
      // console.log(e.target.checked);
      setTheme("night");
      localStorage.setItem("theme", "night");
    } else {
      // console.log(e.target.checked);
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format("dddd, ll, h:mm:ss"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navbar bg-white shadow-sm px-4 text-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex gap-2 items-center">
          <Link to={"/"}>
            <img className="w-auto h-12" src={logo} alt="" />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <label className="toggle text-base-content">
            <input
              onChange={handleTheme}
              type="checkbox"
              value="synthwave"
              className="theme-controller"
              id="theme-toggle"
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
          {time && (
            <span className="text-xs hidden md:flex text-green-800">
              {time}
            </span>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        {/* {!user && ( */}
        <button
          disabled={!user}
          onClick={() => setIsOpen(true)}
          className="disabled:cursor-not-allowed text-green-800 cursor-pointer bg-green-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
        >
          Host your home
        </button>
        {/* )} */}
      </div>
      <HostModal isOpen={isOpen} closeModal={closeModal} handleHostRequest={handleHostRequest}/>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-green-800 font-semibold">
          <li>
            {path === "/" ? (
              <NavLink to={"/rooms"}>Categories</NavLink>
            ) : (
              <NavLink to={"/"}>Home</NavLink>
            )}
          </li>
        </ul>

        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full" title="">
              <img
                referrerPolicy="no-referrer"
                alt="User Profile Photo"
                src={user && user.photoURL ? user.photoURL : avatarImg}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-green-800 font-semibold"
          >
            <li>
              {time && (
                <span className="text-xs flex md:hidden text-green-800">
                  {time}
                </span>
              )}
            </li>
            {user && (
              <li>
                <NavLink to={`/dashboard`}>Dashboard</NavLink>
              </li>
            )}
            {!user ? (
              <li className="">
                <NavLink to={"/signup"}>Signup</NavLink>
              </li>
            ) : (
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-gray-200 block text-center"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
