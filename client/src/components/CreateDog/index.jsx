import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions";

/* function validate(input) {
  let errors = {};
  if (input.name) {
    error.name = "Se requiere nombre";
  }
} */

export default function CreateDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);

  /* Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida */
  const [input, setInput] = useState({
    name: "",
    image: "",
    max_height: "1",
    min_height: "1",
    min_weight: "1",
    max_weight: "1",
    min_lifeSpan: "1",
    max_lifeSpan: 1,
    temperaments: [],
  });
  const sendToPost = {
    name: input.name,
    image: input.image,
    height: `${input.min_height} - ${input.max_height}`,
    weight: `${input.min_weight} - ${input.max_weight}`,
    lifeSpan: `${input.min_lifeSpan} - ${input.max_lifeSpan}`,
    temperaments: input.temperaments,
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }
  function handleTemperament(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
    console.log(input);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(createDog(sendToPost));
    alert("breed created succesfully");
    setInput({
      name: "",
      image: "",
      max_height: "1",
      min_height: "1",
      min_weight: "1",
      max_weight: "1",
      min_lifeSpan: "1",
      max_lifeSpan: 1,
      temperaments: [],
    });
    history.push("/home");
  }

  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <h1>Create a new breed</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Name for your breed"
            type="text"
            value={input.name}
            name="name"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Image"
            value={input.image}
            name="image"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Min Height: </label>
          <input
            type="number"
            value={input.min_height}
            min="1"
            name="min_height"
            onChange={handleChange}
          />
          <label>Max Height: </label>
          <input
            type="number"
            min={(Number(input.min_height) + 1).toString()}
            value={input.max_height}
            name="max_height"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Min Weight:</label>
          <input
            type="number"
            min="1"
            value={input.min_weight}
            name="min_weight"
            onChange={handleChange}
          />

          <label>Max Weight:</label>
          <input
            type="number"
            min={(Number(input.min_weight) + 1).toString()}
            value={input.max_weight}
            name="max_weight"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Min life span: </label>
          <input
            type="number"
            value={input.min_lifeSpan}
            min="1"
            name="min_lifeSpan"
            onChange={handleChange}
          />
          <label>Max life span:</label>
          <input
            type="number"
            min={(Number(input.min_lifeSpan) + 1).toString()}
            value={input.max_lifeSpan}
            name="max_lifeSpan"
            onChange={handleChange}
          />
        </div>

        <select onChange={(e) => handleTemperament(e)}>
          <option value="temp">Choose one or more</option>
          {temperaments?.map((t) => {
            return <option value={t.name}>{t.name}</option>;
          })}
        </select>
        <p>{input.temperaments.map((p) => p + ", ")}</p>

        <button type="submit">Create Breed</button>
      </form>
    </div>
  );
}
