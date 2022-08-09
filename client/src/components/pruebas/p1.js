const users = [
  {
    id: 1,
    name: "Juan",
    age: 21,
  },
  {
    id: 1,
    name: "Juan",
    age: 21,
  },
  {
    id: 2,
    name: "Roberto",
    age: 34,
  },
];

let array = users;

let hash = {};

array = array.filter((p) => (hash[p.id] ? false : (hash[p.id] = true)));
console.log(array);
