
export function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

export function isAllCaseLetter(str) {
    return isLetter(str.toUpperCase()) || isLetter(str.toLowerCase());
}