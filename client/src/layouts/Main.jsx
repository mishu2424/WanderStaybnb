import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import Container from "../components/shared/Container";
import Footer from "../components/shared/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const path = location?.pathname;
  console.log(path);
  return (
    <div>
      <div className={`h-[65px] bg-transparent ${path==='/' && 'absolute'}`}>
        <Navbar path={path} />
      </div>
      <div className="min-h-[calc(100vh-133px)]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
