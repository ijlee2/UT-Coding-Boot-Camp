import React from "react";
import Query from "./Query";
import Results from "./Results";

const Search = () => {
    return [
        <div className="row" key="search_query">
            <div className="col s12 m10 offset-m1 l8 offset-l2">
                <Query />
            </div>
        </div>,
        
        <div className="row" key="search_results">
            <div className="col s12 m10 offset-m1 l8 offset-l2">
                <Results />
            </div>
        </div>
    ];
};

export default Search;