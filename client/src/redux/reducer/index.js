import {
  filterDogsByTemperament,
  FILTERS_BY_TEMPERAMENT,
  FILTER_BY_TEMPERAMENT,
  FILTER_CREATED,
  GET_DOG,
  GET_DOGS,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  SORT_NAME,
  SORT_WEIGHT,
} from "../actions";

//initial states
const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  dog: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_DOG:
      return {
        ...state,
        dog: action.payload,
      };

    case GET_DOG_BY_NAME:
      /*  console.log(action.payload);
      console.log(Array.isArray(action.payload)); */
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          dogs: action.payload,
        };
      } else {
        return {
          ...state,
        };
      }
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case FILTER_BY_TEMPERAMENT:
      const allDogs = state.allDogs;

      let dogsTemp = allDogs.map((p) => {
        if (p.temperament) return p;
      });
      dogsTemp = dogsTemp.filter((p) => p !== undefined);
      //pasa de los perros con temperamento indefinido
      const statusFilter =
        action.payload === "temp"
          ? allDogs
          : dogsTemp.filter((p) => p.temperament.includes(action.payload));
      // poke.filter(p => p.types[0] === action.payload || p.types[1] === action.payload)
      // poke.filter(p => p.types.join(', ').includes(action.payload))
      //
      return {
        ...state,
        dogs: statusFilter, //el state de los perros de vuelve UNICAMENTE los filtrados
      };
    case "POST_DOG":
      return {
        ...state,
      };
    case FILTER_CREATED:
      const allDoggys = state.allDogs;
      const filterCreated =
        action.payload === "created"
          ? allDoggys.filter((p) => p.created)
          : allDoggys.filter((p) => !p.created);
      return {
        ...state,
        dogs: action.payload === "All" ? state.allDogs : filterCreated,
      };

    case SORT_NAME:
      const doggys = state.dogs;
      if (action.payload !== "all") {
        let sortArr =
          action.payload === "asc"
            ? doggys.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                  return -1;
                }
                return 0;
              })
            : doggys.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                return 0;
              });
        return {
          ...state,
          dogs: sortArr,
        };
      }

    case SORT_WEIGHT:
      let dataDogs = state.dogs;
      let sortArrWeight =
        action.payload === "min"
          ? dataDogs.sort(function (a, b) {
              if (a.weight.split(" - ")[0] > b.weight.split(" - ")[0]) {
                return 1;
              }
              if (b.weight.split(" - ")[0] > a.weight.split(" - ")[0]) {
                return -1;
              }
              return 0;
            })
          : dataDogs.sort(function (a, b) {
              if (a.weight.split(" - ")[1] > b.weight.split(" - ")[1])
                return -1; // '15 - 54' [15,54]
              if (b.weight.split(" - ")[1] > a.weight.split(" - ")[1]) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: sortArrWeight,
      };
    /* let sortArr = 
      action.payload === 'min'? doggysForWeight.sort() */

    default:
      return state;
  }
}

export default rootReducer;
