exports.isNotEmpty = function(value) {
    return (value !== "");
}

exports.isNonnegativeReal = function(value) {
    const value_num = parseFloat(value);

    return (value !== "" && !isNaN(value) && value_num >= 0);
}

exports.isWholeNumber = function(value) {
    const value_num = parseFloat(value);

    return (value !== "" && !isNaN(value) && value_num >= 0 && Math.trunc(value_num) === value_num);
}