import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/SingUp/SingUp";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import PrivetRoute from "./PrivetRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoute ";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/menu",
          element:<Menu/>
        },
        {
          path:"/order/:category",
          element:<Order/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element:<SingUp/>
        },
      ]
    },
    {
      path:"/dashboard",
      element:<PrivetRoute><Dashboard/></PrivetRoute>,
      children:[
        {
          path:"mycart",
          element:<MyCart/>
        },
        {
          path:"allusers",
          element:<AllUsers/>
        },
        {
          path:"additem",
          element:<AdminRoute><AddItem/></AdminRoute>
        },
        {
          path:"manageitems",
          element:<AdminRoute><ManageItems/></AdminRoute>
        },
      ]
    }
  ]);

export default router;