import React from "react";
import { Link } from "react-router-dom";
import "./notFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="error-404">
      <div className="information-error-404">
        <span>This path doesn't exist, sorry</span>
      </div>
      <button className="back-to-home-404">
        <Link to="/home">Back to Doggy App</Link>
      </button>
    </div>
  );
}
