import React from "react";

// This Container component allows us to use a bootstrap container without worrying about class names
export const Container = ({ fluid, children }) =>
  <div className={`container${fluid ? "-fluid" : ""}`}>
    {children}
  </div>;
