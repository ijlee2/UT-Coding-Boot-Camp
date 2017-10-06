import React from "react";
import Math from "./Math";

// Create a new component named "Math"
// Render one Math component in the place of each "?" mark
// Math should accept 3 props
// num1, operator, and num2
// Math should return a span tag displaying the result e.g.    19 + 341 = 360
const Calculator = () => (
    <div>
        <p>19 + 341 = <Math num1={19} num2={341} operator="add" /></p>

        <p>42 - 17 = <Math num1={42} num2={17} operator="subtract" /></p>

        <p>100 * 3 = <Math num1={100} num2={3} operator="multiply" /></p>

        <p>96 / 4 = <Math num1={96} num2={4} operator="divide" /></p>
    </div>
);

export default Calculator;
