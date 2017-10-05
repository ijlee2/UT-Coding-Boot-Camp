import React from "react";
import HelloReact from "./components/HelloReact";

const App = () => <HelloReact />;

/* Babel translation
var App = function() {
    return React.createElement(HelloReact, null);
}
*/

export default App;
