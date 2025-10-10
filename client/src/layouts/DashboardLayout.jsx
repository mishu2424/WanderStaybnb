import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  const loc = useLocation();
  // console.log('pathname:', loc.pathname);
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
