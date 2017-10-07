import React from "react";
//import "./Navbar.css";

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper grey darken-4">
                <a href="/" className="brand-logo orange-text text-darken-3">NeoTECH</a>
                <a href="#nowhere" data-activates="neotech-menu-mobile" className="button-collapse"><i className="material-icons">menu</i></a>

                {/* Desktop */}
                <ul className="right hide-on-med-and-down" id="neotech-menu-desktop">
                    <li><a className="neotech-menu-items-desktop" href="/">Home</a></li>
                    <li><a className="neotech-menu-items-desktop" href="/api/scrape">Scrape Threads</a></li>
                    <li><a className="neotech-menu-items-desktop" href="/about">About</a></li>
                </ul>

                {/* Mobile */}
                <ul className="side-nav" id="neotech-menu-mobile">
                    <li><a className="neotech-menu-items-mobile" href="/">Home</a></li>
                    <li><a className="neotech-menu-items-mobile" href="/api/scrape">Scrape Threads</a></li>
                    <li><a className="neotech-menu-items-mobile" href="/about">About</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;