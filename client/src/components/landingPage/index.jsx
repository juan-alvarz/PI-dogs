import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
import { datos } from "./data";

const prevImage = require("../../images/pagination-left.png");
const nextImage = require("../../images/pagination-right.png");

const LandingPage = () => {
  /* FUNCTIONS FOR FUNFACTS */
  const [data, setData] = useState(1);
  function handleNext() {
    if (data <= datos.length) setData(data + 1);
    if (data === datos.length - 1) setData(1);
  }
  function handlePrev() {
    if (data >= 2) setData(data - 1);
    if (data === 1) setData(datos.length - 1);
  }
  /* =========================== */

  return (
    <div className="main-container-landingPage">
      <div className="welcome-page">
        <h1>WELCOME TO THE DOGGYAPP</h1>
        <Link to="/home" className="link-to-start">
          Start App
        </Link>
      </div>
      <div className="start-app"></div>
      <div className="main-container-funfacts">
        <div className="button-landing">
          <button onClick={handlePrev}>
            <img src={prevImage} alt="image not found" />
          </button>
        </div>
        <div className="data-funfact">
          <h2>Fun Facts about doggys</h2>
          <p>{datos[data]}</p>
          <footer className="source-data-landing">
            <span>
              source:{" "}
              <a
                href="https://www.akc.org/expert-advice/lifestyle/dog-facts/"
                target="_blank"
              >
                American Kennel Club
              </a>
            </span>
          </footer>
        </div>
        <div className="button-landing">
          <button onClick={handleNext}>
            <img src={nextImage} alt="image not found" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
