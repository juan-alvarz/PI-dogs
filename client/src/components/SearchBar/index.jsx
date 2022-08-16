import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../redux/actions";
import "./searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getDogByName(name));
  }

  return (
    <div className="searchbar-component">
      <input
        className="searchbar-component"
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Search a breed"
      />
    </div>
  );
}
