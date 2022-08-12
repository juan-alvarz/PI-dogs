import { createDispatchHook } from "react-redux";
import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTERS_BY_TEMPERAMENT = "FILTERS_BY_TEMPERAMENT";
export const FILTER_CREATED = "FILTER_CREATED";
export const SORT_NAME = "SORT_NAME";
export const SORT_WEIGHT = "SORT_WEIGHT";
export const GET_DOG = "GET_DOG";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";

export const getDogs = () => (dispatch) => {
  return fetch("http://localhost:3001/dogs")
    .then((r) => r.json())
    .then((data) => dispatch({ type: GET_DOGS, payload: data }));
};

export async function createNewBreed(payload) {
  let newBreed = await axios.post("http://localhost:3001/dogs", payload);
  return newBreed;
}

export function createDog(payload) {
  return async function (dispatch) {
    const resApi = await axios.post("http://localhost:3001/dogs", payload);
    return resApi;
  };
}

export const getTemperaments = () => (dispatch) => {
  return fetch("http://localhost:3001/temp")
    .then((r) => r.json())
    .then((data) => dispatch({ type: GET_TEMPERAMENTS, payload: data }));
};

export function filterDogsByTemperament(payload) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export const getDogByName = (dogName) => (dispatch) => {
  return fetch(`http://localhost:3001/dogsName?name=${dogName}`)
    .then((r) => r.json())
    .then((data) =>
      dispatch({
        type: GET_DOG_BY_NAME,
        payload: data,
      })
    )
    .then((r) => console.log(r));
};

export function sortByName(payload) {
  return {
    type: SORT_NAME,
    payload,
  };
}

export function sortByWeight(payload) {
  return {
    type: SORT_WEIGHT,
    payload,
  };
}

export const getDog = (id) => (dispatch) => {
  try {
    return fetch(`http://localhost:3001/dogs/${id}`)
      .then((r) => r.json())
      .then((data) => dispatch({ type: GET_DOG, payload: data }));
  } catch (error) {
    console.log(error.message);
  }
};
