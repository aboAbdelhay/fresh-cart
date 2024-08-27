import "./App.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import UpdateUserPassword from "./Components/UpdateUserPassword/UpdateUserPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import WishList from "./Components/WishList/WishList";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import UserContextProvider from "./Context/UserContext";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import AddAddress from "./Components/AddAddress/AddAddress";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "personalDetails",
        element: (
          <ProtectedRoute>
            <PersonalDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "addAddress",
        element: (
          <ProtectedRoute>
            <AddAddress />
          </ProtectedRoute>
        ),
      },
      {
        path: "changePassword",
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "verifyResetCode",
        element: <VerifyResetCode />,
      },
      {
        path: "updateUserPassword",
        element: <UpdateUserPassword />,
      },
      {
        path: "resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);
let query = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              // pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: {
                // background: '#363636',
                // color: '#fff',
              },
              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  // primary: 'green',
                  // secondary: 'black',
                },
              },
            }}
          />
          <ReactQueryDevtools />
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
