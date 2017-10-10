import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";

const App = () =>
    <Router>
        <div>
            <Nav />

            <Switch>
                <Route exact path="/" component={Books} />
                <Route exact path="/books" component={Books} />
                <Route path="/books/:id" component={Detail} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    </Router>;

export default App;
