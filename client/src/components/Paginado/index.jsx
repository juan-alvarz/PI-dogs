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
          <lu key={number}>
            <a onClick={() => paginado(number)}>{number}</a>
          </lu>
        ))}
      </ul>
    </nav>
  );
}
