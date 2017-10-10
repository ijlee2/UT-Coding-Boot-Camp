import React from "react";

// Destructuring the type, className, children and onClick props, applying them to the button element
const Button = ({ type, className, children, onClick }) => (
  <button
    onClick={onClick}
    className={`btn btn-${type ? type : "default"}${className
      ? " " + className
      : ""}`}
  >
    {children}
  </button>
);

export default Button;
