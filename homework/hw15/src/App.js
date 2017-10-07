import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Saved  from "./components/Saved";
import Footer from "./components/Footer";

class App extends Component {
    render() {
        // React 16 array notation
        return [
            <Navbar key="app_navbar" />,

            <div className="nyt-separator-3" key="app_separator1" />,

            <div className="container" key="app_container">
                <Search />
                <Saved />
            </div>,

            <div className="nyt-separator-3" key="app_separator2" />,

            <Footer key="app_footer" />
        ];
    }
}

export default App;