import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>WELCOME TO THE DOGGYAPP</h1>
      <Link to="/home">Ingresar</Link>
    </div>
  );
};

export default LandingPage;
