import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Main from "../layouts/Main";
import Categories from "../pages/Categories/Categories";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement:<ErrorPage/>,
    children:[
        {
            index:true,
            element:<Home/>
        },
        {
            path:'categories',
            element:<Categories/>
        }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }
]);