// Create a sorted array of unique numbers and a target number
const array  = [10, 34, 56, 67, 93, 120, 137, 168, 259, 280, 311, 342, 413, 514];
const target = array[Math.floor(array.length * Math.random())];

// Do a binary search for the target
function binarySearch(array, target, index_l, index_r) {
    const index_m = Math.floor((index_l + index_r) / 2);
    const pivot   = array[index_m];

    if (index_r >= index_l) {
        if (target === pivot) {
            console.log(`Target ${target} found at index ${index_m}.`);

            return;

        } else if (target < pivot) {
            // Search the left half
            binarySearch(array, target, index_l, index_m - 1);

        } else {
            // Search the right half
            binarySearch(array, target, index_m + 1, index_r);

        }

    } else {
        console.log(`Target ${target} not found.`);

        return;

    }
}

binarySearch(array, target, 1, array.length);