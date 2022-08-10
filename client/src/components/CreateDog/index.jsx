import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createDog,
  createNewBreed,
  getTemperaments,
} from "../../redux/actions";

//  IMAGEN DEFAULT DE PERRO
const image_dog_default = require("../../images/default-dog.png");

// --------------------- VALIDACIONES --------------------------
/* 
    name: "",
    image: "",
    max_height: "1",
    min_height: "1",
    min_weight: "1",
    max_weight: "1",
    min_lifeSpan: "1",
    max_lifeSpan: 1,
    temperaments: [], */
function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "name is required";
  } else if (input.max_height < input.min_height)
    errors.max_height = "max height must be greater than min height";
  else if (input.max_weight < input.min_weight)
    errors.max_weight = "max weight must be greater than min weight";
  else if (input.max_lifeSpan < input.min_lifeSpan)
    errors.max_lifeSpan = "max life span must be greater than min life span";

  return errors;
}
//---------------------------------------------------------------------------
export default function CreateDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

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
    image:
      input.image === ""
        ? "https://static.vecteezy.com/system/resources/thumbnails/006/720/668/small/dog-face-logo-free-vector.jpg"
        : input.image,
    height: `${input.min_height} - ${input.max_height}`,
    weight: `${input.min_weight} - ${input.max_weight}`,
    lifeSpan: `${input.min_lifeSpan} - ${input.max_lifeSpan} yea`,
    temperament: input.temperaments.join(", "),
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }
  function handleTemperament(e) {
    if (e.target.value !== "temp") {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
    }
    //console.log(input);
    //console.log(sendToPost);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(sendToPost);
    createNewBreed(sendToPost);
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
  function handleDeleteTemp(el) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((te) => te !== el),
    });
  }

  return (
    <div>
      <Link to="/home">
        <img src={image_dog_default} alt="" />
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
          {errors.name && <p className="error">{errors.name}</p>}
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
          {input.image === "" ? (
            <p className="warning">
              if you dont put image, the app set an image by default
            </p>
          ) : (
            ""
          )}
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
            size="10"
            min={(Number(input.min_height) + 1).toString()}
            value={input.max_height}
            name="max_height"
            onChange={handleChange}
          />
          {errors.max_height && <p className="error">{errors.max_height}</p>}
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
          {errors.max_weight && <p className="error">{errors.max_weight}</p>}
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
          {errors.max_lifeSpan && (
            <p className="error">{errors.max_lifeSpan}</p>
          )}
        </div>

        <select onChange={(e) => handleTemperament(e)}>
          <option value="temp">Choose one or more</option>
          {temperaments?.map((t) => {
            return <option value={t.name}>{t.name}</option>;
          })}
        </select>
        <button type="submit">Create Breed</button>
      </form>
      {/* Liste de temperamentos seleccionadas y posibilidad de borrarlas */}
      <div className="closeTemp">
        {input.temperaments?.map((p) => (
          <span on onClick={() => handleDeleteTemp(p)}>
            {p + " | "}
          </span>
        ))}
      </div>
    </div>
  );
}
