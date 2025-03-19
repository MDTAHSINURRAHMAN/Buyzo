import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <AllProducts />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/checkout/:id",
        element: <Checkout />,
      },
    ],  
  },
]);
