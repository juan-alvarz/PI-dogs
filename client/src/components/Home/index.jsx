import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterDogsByTemperament,
  filterCreated,
  sortByName,
  sortByWeight,
} from "../../redux/actions";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";
import DogCard from "../Card";
import Paginado from "../Paginado";
import "./home.css";

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
  const [order, setOrder] = useState("");

  //define todas las funciones necesarias en un objeto
  const utils = {
    next: (state) => {
      if (state <= 21) {
        setCurrentPage(state + 1);
      }
    },
    prev: (state) => {
      if (state >= 2) {
        setCurrentPage(state - 1);
      }
    },
    paginado: (pageNumber) => {
      setCurrentPage(pageNumber);
    },
    handleClick: (e) => {
      e.preventDefault();

      setCurrentPage(1);
      dispatch(getDogs());
    },
    handleSortAlpha(e) {
      e.preventDefault();
      dispatch(sortByName(e.target.value));
      setCurrentPage(1);
      setOrder(`${e.target.value}`);
    },
    handleSortWeight(e) {
      e.preventDefault();
      if (e.target.value !== "all") {
        dispatch(sortByWeight(e.target.value));
      }
      setCurrentPage(1);
      setOrder(`${e.target.value}`);
    },
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterTemperament(e) {
    dispatch(filterDogsByTemperament(e.target.value));
  }

  return (
    <div>
      <div>
        <Link to="/createDog">crear perro</Link>
        <p>Current Page: {currentPage}</p>
        <div>
          <button onClick={() => utils.prev(currentPage, setCurrentPage)}>
            {"<-"}Prev
          </button>
          <Paginado
            dogsPage={dogsPage}
            allDogs={allDogs.length}
            paginado={utils.paginado}
          />
          <button onClick={() => utils.next(currentPage)}>Next{"->"}</button>
        </div>

        <div className="container-dogs-cards">
          {currentDogs?.map((p) => {
            return (
              <div className="single-home-card">
                <DogCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  image={p.image}
                  temperament={p.temperament}
                  weight={p.weight}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="searchbar-home">
        <h2>DoggyApp</h2>
        <SearchBar />
        <button
          onClick={(e) => {
            utils.handleClick(e);
          }}
        >
          Reload
        </button>
        <br />
        <div className="filters-home">
          <div>FILTERS:</div>
          {/* temperamentos: */}
          <select onChange={(e) => handleFilterTemperament(e)}>
            <optgroup label="TEMPERAMENTS">
              <option value="temp">All</option>

              {allTemperaments?.map((t) => {
                return (
                  <option value={`${t.name}`} key={t.id}>
                    {t.name}
                  </option>
                );
              })}
            </optgroup>
          </select>
          <select onChange={(e) => utils.handleSortAlpha(e)}>
            <optgroup label="ALPHABETIC">
              <option value="all">All</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </optgroup>
          </select>
          <select onChange={(e) => utils.handleSortWeight(e)}>
            <optgroup label="WEIGHT">
              <option value="all">all</option>
              <option value="min">min weight</option>
              <option value="max">max weight</option>
            </optgroup>
          </select>

          <select onChange={(e) => handleFilterCreated(e)}>
            <optgroup label="API - DB">
              <option value="All">all</option>
              <option value="existent">existents</option>
              <option value="created">created</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
}
