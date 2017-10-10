import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navpills from "./components/Navpills";
import About from "./components/pages/About";
import Discover from "./components/pages/Discover";
import SearchResultContainer from "./components/pages/SearchResultContainer";

const App = () =>
    <Router>
        <div>
            <Navpills />
            <Route exact path="/" component={About} />
            <Route path="/about" component={About} />
            <Route path="/discover" component={Discover} />
            <Route path="/search" component={SearchResultContainer} />
        </div>
    </Router>;

export default App;