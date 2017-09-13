module.exports = function displayTable(array, numRowsPerGroup) {
    /************************************************************************
    
        Find out how much space the longest word in each column takes
    
    *************************************************************************/
    const columnWidths = {};

    // Account for the header name
    const headers = Object.keys(array[0]);
    headers.forEach(h => columnWidths[h] = h.length);

    // Account for the values
    array.forEach(row => {
        for (let key in row) {
            columnWidths[key] = Math.max(columnWidths[key], row[key].toString().length);
        }
    });

    
    /************************************************************************
    
        Display the array of objects in a table
    
    *************************************************************************/
    // Create the header
    const output_header = headers.reduce((sum, value) => 
        sum + value + " ".repeat(columnWidths[value] - value.length + 2)

    , "").toUpperCase();

    let count = 0;

    array.forEach(row => {
        // Display the header
        if (count % numRowsPerGroup === 0) {
            console.log(`${output_header}`.yellow.bold);
        }

        // TODO: Use Object.values() once it's fully implemented in ES2017
        const output_row = headers.reduce((sum, value) => {
            const item = row[value].toString();

            return sum + item + " ".repeat(columnWidths[value] - item.length + 2);

        }, "");

        // Display the row
        console.log(output_row.white);

        // Add a separator
        count++;

        if (count % numRowsPerGroup === 0 || count === array.length) {
            console.log();
        }

    });
}