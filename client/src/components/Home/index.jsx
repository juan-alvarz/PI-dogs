import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterDogsByTemperament,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import DogCard from "../Card";
import Paginado from "../Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);

  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  //cuantos perros por pagina

  const [dogsPage, setDogsPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPage; // 7
  const indexOfFirstDog = indexOfLastDog - dogsPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const next = (state) => {
    if (state <= 21) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prev = (state) => {
    if (state >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterStatus(e) {
    dispatch(filterDogsByTemperament(e.target.value));
  }

  return (
    <div>
      <h2>DoggyApp</h2>
      <Link to="/home">crear perro</Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar
      </button>
      <div>
        <select onChange={(e) => handleFilterStatus(e)}>
          <option value="temp">Temperament</option>
          {allTemperaments?.map((t) => {
            return (
              <option value={`${t.name}`} key={t.id}>
                {t.name}
              </option>
            );
          })}
          <option value="temps">array de temperamentos..</option>
        </select>
        <select>
          <option value="todos">Todos</option>
          <option value="alpha">A-Z</option>
          <option value="weight">Weight</option>
        </select>
        <select>
          <option value="todos">Todos</option>
          <option value="existent">api</option>
          <option value="created">db</option>
        </select>
        <p>Current Page: {currentPage}</p>
        <div>
          <button onClick={() => prev(currentPage)}>{"<-"}Prev</button>
          <Paginado
            dogsPage={dogsPage}
            allDogs={allDogs.length}
            paginado={paginado}
          />
          <button onClick={() => next(currentPage)}>Next{"->"}</button>
        </div>
        {currentDogs?.map((p) => {
          return (
            <DogCard
              key={p.id}
              name={p.name}
              image={p.image}
              weight={p.weight}
              lifeSpan={p.lifeSpan}
            />
          );
        })}
      </div>
    </div>
  );
}
