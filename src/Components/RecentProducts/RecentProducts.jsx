import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useGetCart } from "../../Hooks/useGetCart";

export default function RecentProducts({ product }) {
  const {
    imageCover,
    title,
    description,
    category,
    ratingsAverage,
    price,
    id,
  } = product;
  const [isAdding, setIsAdding] = useState(false);
  const { refetch } = useGetCart(); // Use refetch to update the cart data

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      refetch(); // Manually refetch the cart data
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
      <div className="p-2 rounded-lg border-2 border-transparent cursor-pointer overflow-hidden transition-all duration-500 hover:border-green-600 group">
        <Link to={`/productDetails/${id}`}>
          <img src={imageCover} className="w-full" alt={title} />
          <div className="box-content my-2">
            <p className="text-sm text-green-500">{category.name}</p>
            <h2 className="font-medium my-1">
              {title.split(" ").slice(0, 2).join(" ")}
            </h2>
            <div className="flex justify-between items-center my-2">
              <p className="text-sm text-gray-600">{price} EGP</p>
              <p className="text-sm text-gray-600">
                <i className="fas fa-star text-yellow-400 "></i>{" "}
                {ratingsAverage}
              </p>
            </div>
          </div>
        </Link>
        <button
          onClick={handleAddToCart}
          className="w-full p-2 bg-green-500 my-3 rounded-full text-white text-lg text-center transition-all duration-500 translate-y-20 group-hover:-translate-y-0"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
