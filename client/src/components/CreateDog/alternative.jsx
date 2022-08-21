import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createDog,
  createNewBreed,
  getTemperaments,
} from "../../redux/actions";
//Styles
import "./createDog.css";

// --------------------- VALIDATIONS ---------------------------------------------
function validate(input) {
  const correctName = new RegExp("([A-Z]+)+$", "i");
  let errors = {};
  if (!input.name) {
    errors.name = "name is required";
  } else if (!correctName.test(input.name)) {
    errors.name = "only text is supported";
  } else if (input.max_height < input.min_height)
    errors.max_height = "max height must be greater than min height";
  else if (input.max_weight < input.min_weight)
    errors.max_weight = "max weight must be greater than min weight";
  else if (input.max_lifeSpan < input.min_lifeSpan)
    errors.max_lifeSpan = "max life span must be greater than min life span";

  return errors;
}
//----------------------------------------------------------------------------------
export default function CreateDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  /* 
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
    max_lifeSpan: "1",
    temperaments: [],
  });
  const sendToPost = {
    name: input.name,
    image:
      input.image === ""
        ? "https://i.pinimg.com/originals/b2/dc/d9/b2dcd964eedbaa95a87783759e225f6e.jpg"
        : input.image,
    height: `${input.min_height} - ${input.max_height}`,
    weight: `${input.min_weight} - ${input.max_weight}`,
    lifeSpan: `${input.min_lifeSpan} - ${input.max_lifeSpan} years`,
    temperament:
      input.temperaments.length !== 0
        ? input.temperaments.join(", ")
        : "Unknown",
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
    if (e.target.value === "temperament") {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
    }
  }
  function handleTemperament(e) {
    if (e.target.value !== "temp") {
      if (!input.temperaments.includes(e.target.value)) {
        setInput({
          ...input,
          temperaments: [...input.temperaments, e.target.value],
        });
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
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
      <div className="link-back-home">
        <Link to="/home">
          <span>
            Back to <strong>Doggy App</strong>
          </span>
        </Link>
      </div>
      <div className="createdog-form-previous">
        <div className="create-form">
          <h2>Create a new breed</h2>
          <form onSubmit={handleSubmit} className="main-form">
            <div className={errors.name ? "error-input" : ""}>
              <label>Name:</label>
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
              <label>Image:</label>
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
            <div className="temperaments-create">
              <span>Temperaments:</span>
              <select onChange={(e) => handleTemperament(e)} name="temperament">
                <optgroup label="Temperaments">
                  <option value="temp">Choose one or more</option>
                  {temperaments?.map((t, index) => {
                    return (
                      <option key={index} value={t.name}>
                        {t.name}
                      </option>
                    );
                  })}
                </optgroup>
              </select>
              <div className="closeTemp">
                {input.temperaments?.map((p) => (
                  <span onClick={() => handleDeleteTemp(p)}>{p + " "}</span>
                ))}
              </div>
              {input.temperaments.length !== 0 ? (
                ""
              ) : (
                <p className="warning">could have at least one temperament</p>
              )}
            </div>
            <div className="input-number">
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
              {errors.max_height && (
                <p className="error">{errors.max_height}</p>
              )}
            </div>
            <div className="input-number">
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
              {errors.max_weight && (
                <p className="error">{errors.max_weight}</p>
              )}
            </div>
            <div className="input-number">
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
            {Object.keys(errors).length !== 0 ? (
              <button type="submit" disabled={true}>
                incomplete inputs
              </button>
            ) : (
              <button type="submit">create breed</button>
            )}
            {/* <button
              type="submit"
              disabled={Object.keys(errors).length !== 0 ? true : false}
            >
              Create Breed
            </button> */}
          </form>
        </div>

        {/* ========================>>PREVIOUS<<=================== */}

        <div className="container-previous">
          <h2>Previous</h2>
          <div className="previous-create">
            <h3>
              <span>{input.name ? input.name : "name of your breed"}</span>
            </h3>
            <div className="image-example">
              <img
                src={
                  input.image
                    ? input.image
                    : "https://i.pinimg.com/originals/b2/dc/d9/b2dcd964eedbaa95a87783759e225f6e.jpg"
                }
                alt="image not found"
              />
            </div>
            <div className="temperament-example">
              <span>
                Temperament:{" "}
                {input.temperaments.length
                  ? input.temperaments.map((t) => <span>{t + ", "}</span>)
                  : "--Without temperaments--"}
              </span>
            </div>
            <div className="height-example">
              <span>height:{sendToPost.height} cm</span>
            </div>

            <div className="weight-example">
              <span>weight: {sendToPost.weight} kg</span>
            </div>
            <div className="lifespan-example">
              <span>Life span:{sendToPost.lifeSpan}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
