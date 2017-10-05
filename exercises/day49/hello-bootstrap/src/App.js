import React from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Card from "./components/Card";

const App = () => (
    <div className="container">
        <Navbar />
        <Jumbotron />
        <Card />
    </div>
);

export default App;
