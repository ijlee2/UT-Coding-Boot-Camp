import React from "react";

const Container = props =>
  <div className={`container${props.fluid ? "-fluid" : ""}`}>
    {props.children}
  </div>;

export default Container;
