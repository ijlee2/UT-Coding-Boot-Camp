import React from "react";

const PanelBody = (props) => (
    <div>
        <p>Click Count (child): {props.count}</p>

        <button className="btn btn-primary" onClick={props.handleIncrement}>Increment</button>
        <button className="btn btn-primary" onClick={props.handleDecrement}>Decrement</button>
        <button className="btn btn-primary" onClick={props.handleTimesTwo}>Times Two</button>
    </div>
);

export default PanelBody;