// Define problem size
const n = 20;

// Create a test array
let array = [];

for (let index = 0; index < n; index++) {
    array.push(Math.round(1000 * Math.random()));
}

function quickSort(array, index_l, index_r) {
    if (index_l < index_r) {
        // Find the index of the partition element
        let index_p = partition(array, index_l, index_r);

        // Sort the left subarray
        quickSort(array, index_l, index_p);

        // Sort the right subarray
        quickSort(array, index_p + 1, index_r);
    }
}

function partition(array, index_l, index_r) {
    // Choose a pivot element
    const pivot = array[index_l];

    let temp, i = index_l - 1, j = index_r + 1;

    while (true) {
        do {
            i++;

        } while (array[i] < pivot);

        do {
            j--;

        } while (array[j] > pivot);

        if (i >= j) {
            return j;
        }

        // Swap the i-th and j-th elements
        temp     = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

quickSort(array, 0, array.length - 1);

console.log(array.join(", "));