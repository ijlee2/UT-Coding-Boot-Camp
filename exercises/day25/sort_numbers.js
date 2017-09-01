const numbers = process.argv.slice(2);

const numbersSorted = numbers.sort((a, b) => a - b);

console.log(numbersSorted);