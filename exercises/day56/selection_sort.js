// Create an unsorted array of numbers
let array = [120, 280, 34, 311, 514, 56, 168, 93, 137, 413, 259, 10, 280, 342, 67];

// Temporary variables
let index, minimum, temp;

for (let i = 0; i < array.length - 1; i++) {
    // Initialize the minimum value
    index   = i;
    minimum = array[i];

    // Find the minimum value
    for (let j = i; j < array.length; j++) {
        if (array[j] < minimum) {
            index   = j;
            minimum = array[j];
        }
    }

    // Swap the i-th value with the minimum
    temp         = array[i];
    array[i]     = array[index];
    array[index] = temp;
}

console.log(array);