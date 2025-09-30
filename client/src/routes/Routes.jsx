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
import AddRoom from "../pages/Dashboard/Host/AddRoom";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/Statistics";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import HostRoute from "./HostRoute";
import MyBookings from "../pages/Dashboard/Guest/MyBookings";
import MyListings from "../pages/Dashboard/Host/MyListings";
import ManageBookings from "../pages/Dashboard/Host/ManageBookings";

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
        index: true,
        element: <Statistics />,
      },
      // guest
      {
        path:'my-bookings',
        element:<MyBookings/>,
      },

      // host
      {
        path: "add-room",
        element: (
          <PrivateRoute>
            <HostRoute>
              <AddRoom />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-listings",
        element: (
          <PrivateRoute>
            <HostRoute>
              <MyListings />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <PrivateRoute>
            <HostRoute>
              <ManageBookings />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      // admin
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
