import React from "react";

export default function Paginado({ dogsPage, allDogs, paginado }) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(allDogs / dogsPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {pageNumber?.map((number) => (
          <li key={number}>
            <a onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
