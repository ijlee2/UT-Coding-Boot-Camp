const numbers = process.argv.slice(2);

const numbersSorted = numbers.sort((a, b) => parseFloat(a) - parseFloat(b));

console.log(numbersSorted);