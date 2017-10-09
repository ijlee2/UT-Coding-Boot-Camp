import React from "react";

const Navpills = props =>
    <ul className="nav nav-tabs">
        <li className={(props.currentPage === "Home") ? "active" : ""} onClick={() => props.handlePageChange("Home")}>
            <a>Home</a>
        </li>

        <li className={(props.currentPage === "About") ? "active" : ""} onClick={() => props.handlePageChange("About")}>
            <a>About</a>
        </li>
        
        <li className={(props.currentPage === "Blog") ? "active" : ""} onClick={() => props.handlePageChange("Blog")}>
            <a>Blog</a>
        </li>

        <li className={(props.currentPage === "Contact") ? "active" : ""} onClick={() => props.handlePageChange("Contact")}>
            <a>Contact</a>
        </li>
    </ul>;

export default Navpills;