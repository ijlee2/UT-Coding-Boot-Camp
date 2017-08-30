const x = parseFloat(process.argv[3]);
const y = parseFloat(process.argv[4]);

switch (process.argv[2]) {
    case "add":
        console.log(`${x} + ${y} = ${x + y}`);
        break;

    case "subtrac":
        console.log(`${x} - ${y} = ${x - y}`);
        break;
        
    case "multiply":
        console.log(`${x} * ${y} = ${x * y}`);
        break;
        
    case "divide":
        if (y !== 0) {
            console.log(`${x} / ${y} = ${x / y}`);

        } else {
            console.log(`${x} / ${y} = undefined`);
            
        }
        break;
        
    case "remainder":
        console.log(`${x} % ${y} = ${x % y}`);
        break;
        
    case "power":
        console.log(`${x} ^ ${y} = ${x ^ y}`);
        break;

    case "algebra":
        // Assume the expression to be of the form "ax+b=c"
        const expression = process.argv[3];

        const index_variable = expression.indexOf("x");
        const a = expression.substring(0, index_variable);

        if (a !== 0) {
            const index_plus  = expression.indexOf("+");
            const index_equal = expression.indexOf("=");
            const b = expression.substring(index_plus + 1, index_equal);
            const c = expression.substring(index_equal + 1);

            console.log(`x = ${(c - b) / a}`);

        } else {
            console.log("x = undefined");

        }
        break;
}