import React from "react";

const MovieDetail = props =>
  <div className="text-center">
    <img
      className="img-responsive"
      src={props.src}
      style={{ margin: "0 auto" }}
    />
    <h3>
      Director(s): {props.director}
    </h3>
    <h3>
      Genre: {props.genre}
    </h3>
    <h3>
      Released: {props.released}
    </h3>
  </div>;

export default MovieDetail;
