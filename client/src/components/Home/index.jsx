import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterDogsByTemperament,
  filterCreated,
  sortByName,
  getDogByName,
  sortByWeight,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import DogCard from "../Card";
import Paginado from "../Paginado";
import "./home.css";
import "../SearchBar/searchBar.css";

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
  const totalPages = Math.ceil(allDogs.length / dogsPage);
  for (let i = 0; i < Math.ceil(allDogs / dogsPage); i++) {
    totalPages = i;
  }

  const [order, setOrder] = useState("");
  //para la searchBar
  const [nameDoggy, setName] = useState("");

  const IMAGEN = require("../../images/search-icon.png");
  const next_image = require("../../images/pagination-right.png");
  const prev_image = require("../../images/pagination-left.png");
  //some functions in an object
  const utils = {
    next: (state) => {
      if (state <= totalPages - 1) {
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
    setCurrentPage(1);
  }

  function handleFilterTemperament(e) {
    dispatch(filterDogsByTemperament(e.target.value));
    setCurrentPage(1);
  }
  //function for input searchbar
  function handleInputChange(e) {
    e.preventDefault();

    setName(e.target.value);
    setCurrentPage(1);
    e.target.value
      ? dispatch(getDogByName(nameDoggy))
      : dispatch(getDogByName(""));
  }

  return (
    <div>
      <div className="navbar-home">
        <div className="title-and-search">
          <h2 className="title-nav-main" onClick={(e) => utils.handleClick(e)}>
            DoggyApp
          </h2>
          <div className="searchbar-component">
            <input
              className="searchbar-component"
              type="text"
              onChange={(e) => handleInputChange(e)}
              placeholder="Search a breed"
            />
            <span>
              <img src={IMAGEN} alt="" />
            </span>
          </div>
        </div>
        <div className="reload-and-filters">
          <div className="filters-home">
            <span className="filters-title">FILTERS:</span>
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
                <option value="all">All</option>
                <option value="min">min weight</option>
                <option value="max">max weight</option>
              </optgroup>
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
              <optgroup label="API - DB">
                <option value="All">All</option>
                <option value="existent">existents</option>
                <option value="created">created</option>
              </optgroup>
            </select>
            <button
              className="reload-page"
              onClick={(e) => {
                utils.handleClick(e);
              }}
            >
              <span>RELOAD</span>
            </button>
          </div>
        </div>
      </div>
      {/* SEARCHBAR ^^^^^ /////////////// */}
      {/* ===================================== */}

      <div className="main-container-home">
        <div className="paginated-next-prev">
          <div className="next-prev">
            <button onClick={() => utils.prev(currentPage, setCurrentPage)}>
              <img src={prev_image} alt="" />
            </button>
            <span>{currentPage}</span>
            <button onClick={() => utils.next(currentPage)}>
              <img src={next_image} alt="" />
            </button>
          </div>
          <div className="pagination-container-home">
            <Paginado
              dogsPage={dogsPage}
              allDogs={allDogs.length}
              paginado={utils.paginado}
            />
          </div>
        </div>
        <div className="create-dog">
          <Link to="/createDog">
            <span>create a new breed</span>
          </Link>
        </div>
        <div className="container-dogs-cards">
          {currentDogs?.map((p) => {
            return (
              <div className="single-home-card" key={p.id}>
                <DogCard
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
    </div>
  );
}
