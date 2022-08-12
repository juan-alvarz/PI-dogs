import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../../redux/actions";
import "./styles.css";

//imagen-logo

export default function DetailCard() {
  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDog(id));
  }, [dispatch]);

  let Dog = useSelector((state) => state.dog);

  return (
    <div className="main-container-details">
      <div className="card-details">
        <div>
          <img
            src={Dog.image}
            alt="image not found :("
            className="image-details"
          />
        </div>

        <div className="container-info-details">
          <div className="info-dog-details">
            <h1>{Dog.name}</h1>
            <p>
              <strong>Temperament: </strong>
              {Dog.temperament ? Dog.temperament : "Unknown"}
            </p>
            <p>
              <strong>Height: </strong>
              {Dog.height} cm
            </p>
            <p>
              <strong>Weight: </strong>
              {Dog.weight} kg
            </p>
            <p>
              <strong>Life Span: </strong>
              {Dog.lifeSpan}
            </p>
          </div>
        </div>
      </div>
      <div>
        {Dog.created ? (
          ""
        ) : (
          <a
            href={`https://google.com/search?q=${Dog.name}`}
            target="_blank"
            id="additional-information"
          >
            More information about {Dog.name}
          </a>
        )}
      </div>
      <div className="nav-dog-detail">
        <Link to="/home">
          <span>
            Back to <strong>Doggy App</strong>
          </span>
        </Link>
      </div>
    </div>
  );
}
