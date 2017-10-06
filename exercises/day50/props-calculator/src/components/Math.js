import React from "react";

const Math = (props) => {
    const {num1, num2, operator} = props;

    switch (operator) {
        case "add":
            return <p>{num1} + {num2} = {num1 + num2}</p>;

        case "subtract":
            return <p>{num1} - {num2} = {num1 - num2}</p>;

        case "multiply":
            return <p>{num1} * {num2} = {num1 * num2}</p>;

        case "divide":
            return <p>{num1} / {num2} = {num1 / num2}</p>;

        default:
            return <p>Error: Please check your syntax.</p>;

    }
};

export default Math;