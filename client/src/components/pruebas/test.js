/* let users = [
  {
    name: "Juan",
    age: "21 - 45",
  },
  {
    name: "Carlos",
    age: "13 - 54",
  },
  {
    name: "Violeta",
    age: "45 - 89",
  },
];
console.log(users);

let usersSortMin = users.sort((a, b) => {
  if (a.age.split(" - ")[0] > b.age.split(" - ")[0]) {
    return 1;
  }
  if (b.age.split(" - ")[0] > a.age.split(" - ")[0]) return -1;
  return 0;
});

let usersSortMax = users.sort((a, b) => {
  if (a.age.split(" - ")[1] > b.age.split(" - ")[1]) {
    return -1;
  }
  if (b.age.split(" - ")[1] > a.age.split(" - ")[1]) return 1;
  return 0;
});

console.log(usersSortMin);
console.log(usersSortMax);
 */

const axios = require("axios");

async function crearPerro(payload) {
  await axios.post("http://localhost:3001/dogs", payload);
  console.log(payload);
}

let perro = {
  name: "Scooby-Doo",
  height: "10 - 67",
  weight: "10-34",
  lifeSpan: "23-55",
  temperament: "Happy, Playful, Gay",
};

crearPerro(perro);
// client/src/components/pruebas/test.js
