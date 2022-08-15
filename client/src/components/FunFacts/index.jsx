import React, { useState } from "react";
import { datos } from "../landingPage/data";

export default function FunFacts() {
  const [data, setData] = useState(1);
  function handleNext() {
    if (data <= datos.length) {
      setData(data + 1);
    }
    if (data === datos.length - 1) {
      setData(1);
    }
    console.log(data);
  }
  function handlePrev() {
    if (data >= 2) setData(data - 1);
    if (data === 1) setData(datos.length - 1);
  }

  return (
    <div className="main-container-funfacts">
      <button onClick={handlePrev}>Prev</button>
      <h1>{datos[data]}</h1>
      <button onClick={handleNext}>Next</button>
      {console.log(data)}
    </div>
  );
}
