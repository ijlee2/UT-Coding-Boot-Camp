import React from "react";
import { Link } from "react-router-dom";

const Navpills = () =>
  <ul className="nav nav-tabs">
    <li className={window.location.pathname === "/" ? "active" : ""}>
      <Link to="/">Home</Link>
    </li>
    <li className={window.location.pathname === "/about" ? "active" : ""}>
      <Link to="/about">About</Link>
    </li>
    <li className={window.location.pathname === "/blog" ? "active" : ""}>
      <Link to="/blog">Blog</Link>
    </li>
    <li className={window.location.pathname === "/contact" ? "active" : ""}>
      <Link to="/contact">Contact</Link>
    </li>
    <li
      className={window.location.pathname === "/contact/learn" ? "active" : ""}
    >
      <Link to="/contact/learn">Learn</Link>
    </li>
  </ul>;

export default Navpills;
