// object shorthand syntax
const name = "Nick";
const age  = 42;

// key names and values are computed from variable
const instructor = {name, age};
console.log(instructor); // {name: "Nick", age: 42"}

// reassign variable name
const {"name": teacher} = instructor;
console.log(teacher); // Nick

// default assignment
const {course = "FullStack"} = instructor;
console.log(course); // "FullStack"

// function parameters can also use destructuring and default values!
const divide = (a = 4, b = 2) => a / b;
console.log(divide()); // 2

const getName = ({"name": firstName}) => console.log(firstName);
getName(instructor); // Nick