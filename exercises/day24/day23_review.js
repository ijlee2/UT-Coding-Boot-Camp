// Read 2 numbers
const x = parseFloat(process.argv[2]);
const y = parseFloat(process.argv[3]);

console.log("Are the two inputs equal?");
console.log(x === y);

console.log("Are both numbers multiples of 7?");
console.log(x % 7 === 0 && y % 7 === 0);