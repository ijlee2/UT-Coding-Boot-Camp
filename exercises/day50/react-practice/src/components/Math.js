import React from "react";

const Math = (props) => {
    const {num1, num2, operator} = props;

    switch (operator) {
        case "add":
            return <span>{num1 + num2}</span>;

        case "subtract":
            return <span>{num1 - num2}</span>;

        case "multiply":
            return <span>{num1 * num2}</span>;

        case "divide":
            return <span>{num1 / num2}</span>;

        default:
            return <span>Error: Please check your syntax.</span>;

    }
};

export default Math;