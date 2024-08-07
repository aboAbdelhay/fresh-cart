import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Slider from "react-slick";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);

  async function fetchProductDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchRelatedProducts(categoryId) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
      );
      setRelatedProducts(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails) {
      fetchRelatedProducts(productDetails.category._id);
    }
  }, [productDetails]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  const settingsRelatedProducts = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <>
      {productDetails && relatedProducts ? (
        <div className="pt-4 pb-14">
          <button>
            <Link to="/home" className="text-green-600 fa-2x">
              <i className="fas fa-arrow-left"></i> Back Home
            </Link>
          </button>
          <h2 className="text-4xl text-center text-green-600">
            Product Details{" "}
            {productDetails.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <div className="flex flex-wrap items-center justify-center pt-10">
            <div className="w-1/4">
              <Slider {...settings}>
                {productDetails.images.map((image, index) => (
                  <img
                    src={image}
                    className="w-full h-[300px]"
                    alt={productDetails.title}
                    key={index}
                  />
                ))}
              </Slider>
            </div>
            <div className="w-3/4">
              <div className="w-3/4 mx-auto">
                <h2>{productDetails.title}</h2>
                <p className="my-6 text-gray-400">
                  {productDetails.description}
                </p>
                <h3>{productDetails.category.name}</h3>
                <div className="flex justify-between items-center my-2">
                  <p className="text-sm text-gray-600">
                    {productDetails.price} EGP
                  </p>
                  <p className="text-sm text-gray-600">
                    <i className="fas fa-star text-yellow-400"></i>
                    {productDetails.ratingsAverage}
                  </p>
                </div>
                <button className="w-full p-2 bg-green-500 my-4 rounded-full text-white text-lg text-center transition-all duration-500 hover:bg-green-600">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="text-center w-3/4 ms-auto">
            <h2 className="text-center text-green-600 text-2xl mb-4">
              Related Products
            </h2>
            <Slider {...settingsRelatedProducts}>
              {relatedProducts?.map((product, index) => (
                <Link
                  to={`/productDetails/${product._id}`}
                  className="cursor-pointer"
                  key={index}
                >
                  <img
                    src={product.imageCover}
                    className="w-full h-[250px]"
                    alt={product.title}
                  />
                  <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <div className="h-screen center">
          <Loading />
        </div>
      )}
    </>
  );
}
