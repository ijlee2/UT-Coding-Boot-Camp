import React from "react";
import List from "./components/List";

const groceries = [
    {
        "id": 1,
        "name": "Milk",
        "purchased": true
    },
    {
        "id": 2,
        "name": "Eggs",
        "purchased": true
    },
    {
        "id": 3,
        "name": "Cheese",
        "purchased": false
    },
    {
        "id": 4,
        "name": "Cake Mix",
        "purchased": false
    },
    {
        "id": 5,
        "name": "Carrots",
        "purchased": false
    },
    {
        "id": 6,
        "name": "Juice",
        "purchased": true
    }
];

const App = () => <List groceries={groceries} />;

export default App;