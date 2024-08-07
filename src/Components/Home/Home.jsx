import React, { useContext, useEffect, useState } from "react";
import Loading from "./../Loading/Loading";
import axios from "axios";
import RecentProducts from "./../RecentProducts/RecentProducts";
import Slider from "react-slick";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  async function getApiProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getApiCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getApiProducts();
    getApiCategories();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 8,
    slidesToScroll: 2,
    pauseOnHover: true,
    arrows: false,
  };
  return (
    <>
      <MainSlider />
      {products.length && categories ? (
        <>
          <div className="row">
            <h3 className="font-medium text-xl my-2 ">
              shop popular Categories
            </h3>
            <Slider {...settings}>
              {categories.map((category, index) => (
                <div className="my-3" key={index}>
                  <img
                    src={category.image}
                    className="w-full h-[200px]"
                    alt=""
                  />
                  <h2>{category.name}</h2>
                </div>
              ))}
            </Slider>{" "}
          </div>
          <div className="flex flex-wrap justify-center items-center">
            {products.map((product) => (
              <RecentProducts key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
