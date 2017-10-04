// convert the code below to use the array methods instead of for loops
// you'll need to use the filter, reduce, map, and forEach methods
const princesses = [
    {"name": 'Rapunzel', "age": 18},
    {"name": 'Mulan'   , "age": 16},
    {"name": 'Anna'    , "age": 18},
    {"name": 'Moana'   , "age": 16}
];


// log the name of each princess, follow by a colon, followed by their age
// can be replaced with forEach
princesses.forEach(p => {
    console.log(`${p.name}: ${p.age}`);

});


// create an array of princess names from the existing array
// can be replaced with map
const names = princesses.map(p => p.name);

console.log("names: ", names);


// using the `names` array, get only those names that start with an 'M'
// can be replaced with filter
const mNames = princesses.filter(p => p.name.startsWith("M"));

console.log("m-names: ", mNames);


// get a single value from the data: the average age of all of the princesses
// Can be replaced with reduce
const sum     = princesses.reduce((sum, princess) => sum + princess.age, 0);
const average = sum / princesses.length;

console.log("average age: ", average);


// BONUS: get the average age of all princesses whose name includes an 'l'
const lNames = princesses.filter(p => p.name.includes('l'));

console.log("l-names: ", lNames);