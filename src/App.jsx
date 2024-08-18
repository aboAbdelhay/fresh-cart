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
let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetPassword",
        element: (
          <ProtectedRoute>
            <ForgetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "verifyResetCode",
        element: (
          <ProtectedRoute>
            <VerifyResetCode />
          </ProtectedRoute>
        ),
      },
      {
        path: "updateUserPassword",
        element: (
          <ProtectedRoute>
            <UpdateUserPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "resetPassword",
        element: (
          <ProtectedRoute>
            <ResetPassword />
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
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { index: true, element: <Register /> },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <Notfound />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
let query = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={query}>
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
    </QueryClientProvider>
  );
}

export default App;
