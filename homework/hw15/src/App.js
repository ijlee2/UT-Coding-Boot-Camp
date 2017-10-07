import React, {Component} from "react";
import Navbar from "./components/Navbar";
import Body   from "./components/Body";
import Footer from "./components/Footer";
import "./App.css";

class App extends Component {
    // Show images by default
    state = {
        "displayImages": true
    };

    render() {
        // React 16 notation
        return [
            <Navbar key="app_navbar" />,

            <div key="app_container" className="container">
                <Body />
            </div>,

            <Footer key="app_footer" />
        ];
    }
}

export default App;