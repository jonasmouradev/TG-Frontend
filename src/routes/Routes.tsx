import { createBrowserRouter } from "react-router-dom";
import Configs from "../pages/Configs";
import Home from "../pages/home";
import SignUp from "../pages/signUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/configs",
    element: <Configs />,
  },
]);
