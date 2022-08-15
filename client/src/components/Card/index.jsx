import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function DogCard({ id, name, image, temperament, weight }) {
  return (
    <div className="main-container-card">
      <Link to={`/detail/${id}`}>
        <div className="link-to-details">
          <h3>{name}</h3>
        </div>
        <div className="image-dog-card">
          <img src={image} alt="incorrect image :(" />
        </div>
        <div className="information-dog-card">
          <p>
            <strong>temperament:</strong>{" "}
            {temperament ? temperament : "Unknown"}
          </p>
          <p>
            <strong>weight:</strong> {weight} kg
          </p>
        </div>
      </Link>
    </div>
  );
}

/* magen
Nombre
Temperamento
Peso */
