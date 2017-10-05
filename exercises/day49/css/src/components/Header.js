import React from "react";
import "../styles/Header.css";

// By importing the Header.css file, it is added to the DOM whenever this component loads
const style_header = {
    "backgroundColor": "red"
}

const style_h1 = {
    "fontSize": "100px"
}

const Header = () => (
    <header className="header" style={style_header}>
        <h1 style={style_h1}>Welcome</h1>
    </header>
);

export default Header;