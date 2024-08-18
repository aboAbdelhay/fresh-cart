import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useGetCart } from "../../Hooks/useGetCart";
import StarRating from "../StarRating/StarRating";
import toast from "react-hot-toast";
import { useGetWishList } from "../../Hooks/useGetWishList";

export default function RecentProducts({ product }) {
  const { imageCover, title, category, ratingsAverage, price, id } = product;
  const [isAdding, setIsAdding] = useState(false);
  const { refetch } = useGetCart(); // Use refetch to update the cart data
  const { refetch: refetchWishList, data } = useGetWishList(); // Use refetch to update the refetch WishList data

  const handleAddToWishList = async () => {
    setIsAdding(true);
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishList`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success(response.data.message);
      console.log(data);
      refetchWishList(); // Manually refetch the wishList data
      console.log(data);
    } catch (error) {
      toast.error(
        "Error: Unable to add the product to your wishList. Please try again later."
      );
      console.error("Error adding to wishList:", error);
    } finally {
      setIsAdding(false);
    }
  };
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success(response.data.message);
      refetch(); // Manually refetch the cart data
    } catch (error) {
      toast.error(
        "Error: Unable to add the product to your cart. Please try again later."
      );
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 relative">
        <div className="p-2 rounded-lg  transition-all duration-500 hover:border-green-600 hover:shadow-[0px_0px_10px_rgba(34,197,94,1)] hover:scale-[1.03] group">
          <img src={imageCover} className="w-full" alt={title} />
          <div className="my-2">
            <p className="text-sm text-green-500">{category.name}</p>
            <h2 className="font-medium my-1">
              {title.split(" ").slice(0, 2).join(" ")}
            </h2>
            <div className="between my-2">
              <p className="text-sm text-green-500">{price} EGP</p>
              <p>
                <StarRating ratingsAverage={ratingsAverage} />
                <span> {ratingsAverage}</span>
              </p>
            </div>
          </div>
          <div className="center gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {!isAdding && (
              <>
                <button
                  onClick={() => handleAddToWishList()}
                  disabled={isAdding}
                  className="center bg-green-500 w-10 h-10 rounded-full opacity-0 transition-all duration-500  cursor-pointer  translate-y-16 group-hover:-translate-y-0  group-hover:opacity-100 hover:bg-green-600 "
                >
                  <i className="fas fa-heart text-white text-lg "></i>
                </button>{" "}
                <button
                  disabled={isAdding}
                  onClick={() => handleAddToCart()}
                  className="center bg-green-500 w-10 h-10 rounded-full opacity-0 transition-all duration-700  cursor-pointer translate-y-16 group-hover:-translate-y-0  group-hover:opacity-100 hover:bg-green-600 "
                >
                  <i className="fas fa-cart-shopping text-white text-lg "></i>
                </button>{" "}
                <Link to={`/productDetails/${id}`}>
                  <button
                    disabled={isAdding}
                    className="center bg-green-500 w-10 h-10 rounded-full opacity-0 transition-all duration-1000 cursor-pointer translate-y-16 group-hover:-translate-y-0  group-hover:opacity-100 hover:bg-green-600 "
                  >
                    <i className="fas fa-eye text-white text-lg "></i>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
