import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
    dispatch(getDogByName(name));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogByName(name));
  }

  return (
    <div>
      <input
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Search a breed"
      />
      <button>Search</button>
    </div>
  );
}
