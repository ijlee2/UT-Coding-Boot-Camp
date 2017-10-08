import React, { Component } from "react";

// Import components
import Header from "./components/Header";
import Body   from "./components/Body";
import Footer from "./components/Footer";

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="container">
                    <div className="row">
                        <div className="col s12 xl8 offset-xl2">
                            <Header />

                            <div className="nyt-separator-2" />

                            <Body />

                            <div className="nyt-separator-3" />
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default App;