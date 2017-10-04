// ----- Object Destructuring ------
const luke = {"occupation": "Jedi", "father": "Anakin"};

// ES5
/*
var occupation = luke.occupation; // Jedi
var father     = luke.father; // Anakin
*/

// ES6 - Destructuring
const {occupation, father} = luke;

console.log(occupation); // Jedi
console.log(father); // Anakin

// ----- Array Destructuring ------
const racers = ["Anakin", "Gasgano", "Aldar Beedo", "Ebe E. Endocott"];

// ES5
/*
var first  = racers[0]; // Anakin
var second = racers[1]; // Gasgano
var others = racers.slice(2); // ['Aldar Beedo', 'Ebe E. Endocott']
*/

// ES6 - Array destructuring also using `...` rest pattern
const [first, second, ...others] = racers;

console.log(first); // Anakin
console.log(second); // Gasgano
console.log(others); // ['Aldar Beedo', 'Ebe E. Endocott']