import { createBrowserRouter } from "react-router-dom";
import Configs from "../pages/Configs";
import Home from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/configs",
    element: <Configs />,
  },
]);
