import React, { useState } from "react";
import style from "./Categories.module.css";
import useCategories from "../../Hooks/useCategories";
import Loading from "../Loading/Loading";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Categories() {
  let { data, isLoading } = useCategories();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {data?.data.data.map((category, index) => (
            <div
              className="sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 "
              key={index}
            >
              <img src={category.image} className="w-full h-[200px]" alt="" />
              <h2>{category.name}</h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
