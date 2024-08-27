import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { useGetCart } from "../../Hooks/useGetCart";
import { useNavigate } from "react-router-dom"; // Ensure this is imported

export default function Checkout() {
  let { data: cart, refetch } = useGetCart();
  const navigate = useNavigate(); // Initialize navigate
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  localStorage.setItem("cartOwner", JSON.stringify(cart?.data?.cartOwner));

  async function handleCheckout(values, paymentMethod) {
    try {
      setLoading(true);
      setApiError(null); // Reset previous errors

      const url =
        paymentMethod === "online"
          ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=https://fresh-cart-alpha.vercel.app/`
          : `https://ecommerce.routemisr.com/api/v1/orders/${cart.data._id}`;

      const response = await axios.post(
        url,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      refetch();
      setLoading(false);

      if (paymentMethod === "online") {
        window.location.href = response.data.session.url;
      } else {
        navigate("/allorders");
      }
    } catch (error) {
      setLoading(false);
      setApiError(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  }

  let validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(10, "Details must be at least 10 characters long")
      .max(500, "Details can't be longer than 500 characters")
      .required("Details are required"),

    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/, "Phone must be an Egyptian number")
      .required("Phone number is required"),

    city: Yup.string()
      .min(2, "City name must be at least 2 characters long")
      .max(100, "City name can't be longer than 100 characters")
      .required("City is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      handleCheckout(values, formik.values.paymentMethod);
    },
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto md:w-1/2 py-12 px-6 shadow-css rounded-lg mt-4">
          <h1 className="text-3xl md:text-4xl pb-2 font-semibold text-center text-green-500">
            <i className="fas fa-credit-card"></i> Checkout
          </h1>
          <form onSubmit={formik.handleSubmit}>
            {apiError && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {apiError}
              </div>
            )}

            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                type="text"
                name="details"
                id="details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your details
              </label>
            </div>
            {formik.errors.details && formik.touched.details && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.details}
              </div>
            )}

            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your phone
              </label>
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            )}

            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your city
              </label>
            </div>
            {formik.errors.city && formik.touched.city && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.city}
              </div>
            )}

            <div className="between flex-col gap-4">
              <button
                type="button"
                onClick={() => handleCheckout(formik.values, "online")}
                className="text-white tr3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Pay Online
              </button>
              <button
                type="button"
                onClick={() => handleCheckout(formik.values, "cash")}
                className="text-white tr3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Pay with Cash
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
