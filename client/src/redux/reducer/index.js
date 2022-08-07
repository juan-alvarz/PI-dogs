import { FILTER_BY_TEMPERAMENT, GET_DOGS, GET_TEMPERAMENTS } from "../actions";

const dataDog = () => {
  var info = fetch("http://localhost:3001/dogs").then((r) => r.json());
  return info;
};

const initialState = {
  dogs: [],
  temperaments: [],
  dog: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case FILTER_BY_TEMPERAMENT:
      const allDogs = state.dogs;
      const statusFilter =
        action.payload === "temp"
          ? allDogs
          : allDogs.filter((p) => p.temperament.includes(action.payload));
      return {
        ...state,
        dogs: statusFilter,
      };

    default:
      return state;
  }
}

export default rootReducer;
