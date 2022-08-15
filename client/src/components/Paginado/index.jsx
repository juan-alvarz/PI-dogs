import React from "react";
import "./paginado.css";

export default function Paginado({ dogsPage, allDogs, paginado }) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(allDogs / dogsPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav className="pagination-component">
      <div className="pagination-container">
        {pageNumber?.map((number) => (
          <button key={number} className="pagination">
            <a onClick={() => paginado(number)}>{number}</a>
          </button>
        ))}
      </div>
    </nav>
  );
}
