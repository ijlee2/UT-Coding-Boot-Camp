import React from "react";
import "../styles/Navbar.css";

// By importing the Navbar.css file, it is added to the DOM whenever this component loads
const style_nav = {
    "backgroundColor": "green"
};


const Navbar = () => (
    <nav className="navbar" style={style_nav}>
        <a href="/">Welcome</a>
    </nav>
);

export default Navbar;