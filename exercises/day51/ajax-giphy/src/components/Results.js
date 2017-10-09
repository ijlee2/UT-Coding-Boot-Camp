import React from "react";

const Results = props =>
  <ul className="list-group">
    {props.results.map(result =>
      <li className="list-group-item" key={result.id}>
        <img className="img-responsive" src={result.images.original.url} />
      </li>
    )}
  </ul>;

export default Results;
