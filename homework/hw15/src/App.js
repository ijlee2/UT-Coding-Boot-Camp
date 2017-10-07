import React, { Component } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Saved  from "./components/Saved";
import Footer from "./components/Footer";

class App extends Component {
    render() {
        // React 16 array notation
        return [
            <div className="container">
                <div className="row">
                    <div className="col s12 m10 offset-m1 l8 offset-l2">
                        <Header />

                        <div className="nyt-separator-2" />

                        <Search />

                        <div className="nyt-separator-1" />

                        <Saved />

                        <div className="nyt-separator-3" />
                    </div>
                </div>
            </div>,

            <Footer />
        ];
    }
}

export default App;