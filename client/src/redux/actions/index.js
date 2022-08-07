export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";

export const getDogs = () => (dispatch) => {
  return fetch("http://localhost:3001/dogs")
    .then((r) => r.json())
    .then((data) => dispatch({ type: GET_DOGS, payload: data }));
};

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
