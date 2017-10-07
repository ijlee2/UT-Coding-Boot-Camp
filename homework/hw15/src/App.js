import React, {Component} from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

class App extends Component {
    // Show images by default
    state = {
        "displayImages": true
    };

    render() {
        // React 16 notation
        return ([
            <Navbar />,
            <Footer />
        ]);
    }
}

export default App;