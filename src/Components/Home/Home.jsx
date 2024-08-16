import Loading from "./../Loading/Loading";
import axios from "axios";
import RecentProducts from "./../RecentProducts/RecentProducts";
import Slider from "react-slick";
import MainSlider from "../MainSlider/MainSlider";
import useProducts from "../../Hooks/useProducts";
import useCategories from "../../Hooks/useCategories";

export default function Home() {
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
  let { data, isLoading } = useProducts();
  let categories = useCategories();
  return (
    <>
      <MainSlider />
      {!isLoading ? (
        <>
          <div className="row">
            <h3 className="font-medium text-xl my-2 ">
              shop popular Categories
            </h3>
            <Slider {...settings}>
              {categories?.data?.data.data.map((category, index) => (
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
            {data?.data.data.map((product) => (
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
