import React from "react";
import { Link } from "react-router-dom";

export default function DogCard({ name, image, temperament, weight }) {
  return (
    <div>
      <Link to={`/home/name`}>
        <h3>{name}</h3>
      </Link>
      <img src={image} alt="incorrect image :(" />
      <p>
        <strong>temperament:</strong> {temperament}
      </p>
      <p>
        <strong>weight: </strong> {weight} kg
      </p>
    </div>
  );
}

/* magen
Nombre
Temperamento
Peso */
