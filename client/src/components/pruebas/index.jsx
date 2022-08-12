import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const image = require("../../images/logo-app.png");
function Prueba() {
  const [isCheck, setCheck] = useState(false);

  const handleOnChange = () => {
    setCheck(!isCheck);
  };

  const IconSearch = require("../../images/search-icon.png");
  return (
    <div class="wrap">
      <div class="search">
        <input
          type="text"
          class="searchTerm"
          placeholder="What are you looking for?"
        />
        <button type="submit" class="searchButton">
          <img src={IconSearch} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Prueba;
