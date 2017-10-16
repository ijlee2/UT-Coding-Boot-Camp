// Create an array of numbers and a target number
const array  = [10, 34, 56, 67, 93, 120, 137, 168, 259,280, 311, 342, 413, 514];
const target = array[Math.floor(array.length * Math.random())];

// Do a linear search for the target
for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
        console.log(`Target ${target} found at index ${i}.`);

        break;
    }
}