import React, { useState } from "react";
import style from "./Cart.module.css";
import Loading from "./../Loading/Loading";
import axios from "axios";
import { useGetCart } from "../../Hooks/useGetCart";
import Products from './../Products/Products';
import { Link } from "react-router-dom";

export default function Cart() {
  const { data: cartData, error, isLoading, refetch } = useGetCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const updateProductInCart = async (productId, count) => {
    if (count > 0) {
      setIsProcessing(true);
      try {
        await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count },
          {
            headers: { token: localStorage.getItem("userToken") },
          }
        );
        refetch();
      } catch (error) {
        console.error("Error updating cart:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const deleteProductInCart = async (productId) => {
    setIsProcessing(true);
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      refetch();
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteAllProductsInCart = async () => {
    setIsProcessing(true);
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("userToken") },
      });
      refetch();
      console.log(cartData);
    } catch (error) {
      console.error("Error deleting all products from cart:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
       <div className="center h-screen flex-col ">
        <h2 className="text-center text-green-600">please add Products to cart </h2>
        <button className="px-2 py-1 bg-green-600 text-white ">
          <Link to="/products">go to products</Link>
        </button>
       </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartData?.data.products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product?.product.title?.split(" ").slice(0, 2).join(" ")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateProductInCart(
                            product.product.id,
                            product.count + 1
                          )
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        disabled={isProcessing}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                      <span>{product.count}</span>
                      <button
                        onClick={() =>
                          updateProductInCart(
                            product.product.id,
                            product.count - 1
                          )
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        disabled={isProcessing}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProductInCart(product.product.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      disabled={isProcessing}
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  className="px-6 py-8 text-center font-semibold text-gray-900 dark:text-white text-3xl"
                  colSpan="2"
                >
                  Total Price
                </td>
                <td className="px-6 py-8 font-semibold text-gray-900 dark:text-white text-xl">
                  {cartData.numOfCartItems}
                </td>
                <td className="px-6 py-8 font-semibold text-gray-900 dark:text-white text-xl">
                  = {cartData.data.totalCartPrice} EGP
                </td>
                <td className="px-6 py-8">
                  <button
                    onClick={deleteAllProductsInCart}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    disabled={isProcessing}
                  >
                    <i className="fas fa-trash"></i> Remove All
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
}
