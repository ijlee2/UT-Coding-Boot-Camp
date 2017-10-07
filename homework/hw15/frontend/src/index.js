import React from "react";

// Import just the render method from react-dom
import { render } from "react-dom";

// Import BrowserRouter from react-router
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import CSS
import "./index.css";

// Import components
import App from "./App";

// Progressive web app (optional)
import registerServiceWorker from "./registerServiceWorker";

const router = (
    // A Router can have only 1 child element, so we add a div tag to allow multiple Routes
    <Router>
        <div>
            <Route exact path="/" component={App} />
        </div>
    </Router>
);

render(router, document.getElementById("root"));

registerServiceWorker();