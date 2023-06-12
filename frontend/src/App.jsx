import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "../src/contexts/UserContext";
import ContextLayout from "./layouts/ContextLayout/ContextLayout";
import RootLayout from "./layouts/RootLayout/RootLayout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ReviewProduct from "./pages/ReviewProduct/ReviewProduct";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import SignIn from "./pages/SignIn/SignIn";
import Checkout from "./pages/Checkout/Checkout";
import Profile from "./pages/Profile/Profile";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ContextLayout />,
      children: [
        {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/products",
              element: <Products />,
            },
            {
              path: "/products/:id",
              element: <ProductDetails />,
            },
            {
              path: "/reviewproduct/:id",
              element: <ReviewProduct />,
            },
            {
              path: "/contact",
              element: <Contact />,
            },
            {
              path: "/cart",
              element: <Cart />,
            },
            {
              path: "/profile",
              element: <Profile />
            },
            {
              path: "/checkout",
              element: <Checkout />
            },
            {
              path: "/signin",
              element: <SignIn />
            },
            {
              path: "/ordersuccess",
              element: <OrderSuccess />
            },
            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
