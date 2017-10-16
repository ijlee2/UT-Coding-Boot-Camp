// Create an unsorted array of numbers
let array = [120, 280, 34, 311, 514, 56, 168, 93, 137, 413, 259, 10, 280, 342, 67];

// Temporary variables
let index, minimum, temp;

console.log(array);

for (let i = 1; i < array.length; i++) {
    // Save the i-th element
    const value = array[i];

    // Insert the i-th element in its right place
    for (let j = i - 1; j >= 0; j--) {
        if (value < array[j]) {
            temp         = array[j];
            array[j]     = array[j + 1];
            array[j + 1] = temp;
        }
    }

    console.log(array);
}