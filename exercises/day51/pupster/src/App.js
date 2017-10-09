import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navpills from "./components/Navpills";
import Home     from "./components/pages/Home";
import Discover from "./components/pages/Discover";
import SearchResultContainer from "./components/pages/SearchResultContainer";

const App = () =>
    <Router>
        <div>
            <Navpills />
            <Route exact path="/" component={Home} />
            <Route exact path="/discover" component={Discover} />
            <Route exact path="/search" component={SearchResultContainer} />
        </div>
    </Router>;

export default App;