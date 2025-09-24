import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Main from "../layouts/Main";
import Categories from "../pages/Categories/Categories";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import RoomDetails from "../components/Rooms/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import Profile from "../components/Profile";
import AddRoom from "../pages/Dashboard/Host/AddRoom/AddRoom";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/Host/AddRoom/Statistics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "rooms",
        element: <Categories />,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index:true,
        element: <Statistics />,
      },
      {
        path: "add-room",
        element: <AddRoom />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
