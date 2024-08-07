import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Slider from "react-slick";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState();
  async function getApi() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getApi();
  }, []);
  var settings = {
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
  return (
    <>
      {productDetails ? (
        <div className="flex flex-wrap items-center justify-center pt-10">
          <div className="w-1/4">
            <Slider {...settings}>
              {productDetails.images.map((image, index) => (
                <img src={image} className="w-full" alt="" key={index} />
              ))}
            </Slider>{" "}
          </div>
          <div className="w-3/4 ">
            <div className="w-3/4 mx-auto">
              <h2>{productDetails.title}</h2>
              <p className="my-6 text-gray-400">{productDetails.description}</p>
              <h3>{productDetails.category.name}</h3>
              <div className="flex justify-between items-center my-2">
                <p className="text-sm text-gray-600">
                  {productDetails.price} EGP
                </p>
                <p className="text-sm text-gray-600">
                  <i className="fas fa-star text-yellow-400 "></i>{" "}
                  {productDetails.ratingsAverage}
                </p>
              </div>
              <button className="w-full p-2 bg-green-500 my-4 rounded-full text-white text-lg text-center transition-all duration-500 hover:bg-green-600">
                Add cart
              </button>
            </div>
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
