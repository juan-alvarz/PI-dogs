import React from "react";
import { Link } from "react-router-dom";

export default function DogCard({ name, image, weight, lifeSpan }) {
  return (
    <div>
      <Link to={`/home/${name}`}>
        <h3>{name}</h3>
      </Link>
      <img src={image} alt="" />
      <h4>{weight}</h4>
      <h4>{lifeSpan}</h4>
    </div>
  );
}
