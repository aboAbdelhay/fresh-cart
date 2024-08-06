import React, { useContext, useState } from "react";
import style from "./Home.module.css";
import { CounterContext } from "../Context/CounterContext";

export default function Home() {
  let { counter, setCounter } = useContext(CounterContext);
  return (
    <>
      <h1 className="text-3xl">Home{counter}</h1>

      <button
        onClick={() => setCounter(counter - 1)}
        className="p-1 ms-3  bg-green-500"
      >
        -
      </button>
      <button
        onClick={() => setCounter(counter + 1)}
        className="p-1 ms-3  bg-green-500"
      >
        +
      </button>
    </>
  );
}
