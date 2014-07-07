exports.integer = integer;

function integer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

