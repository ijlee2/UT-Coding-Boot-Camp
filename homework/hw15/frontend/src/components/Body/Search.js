import React from "react";

import Query from "./Search/Query";
import Results from "./Search/Results";

const Search = (props) => {
    return (
        <div className="search">
            <Query
                topic={props.topic}
                startYear={props.startYear}
                endYear={props.endYear}
                articles={props.articles}
                handleChange={props.handleChange}
                handleSubmit={props.handleSubmit}
            />
            
            <div className="nyt-separator-2" />
            
            <Results
                articles={props.articles}
                handleSave={props.handleSave}
            />
        </div>
    );
}

export default Search;