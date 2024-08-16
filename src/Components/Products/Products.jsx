import React, { useState } from "react";
import style from "./Products.module.css";
import useProducts from "../../Hooks/useProducts";
import Loading from "../Loading/Loading";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Products() {
  let { data, isLoading } = useProducts();

  return (
    <>  
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {data?.data.data.map((product) => (
            <RecentProducts key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
