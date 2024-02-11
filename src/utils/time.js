

export function getTimezoneOffset(date) {
    let offset = date.getTimezoneOffset();
    let sign = offset > 0 ? '-' : '+';
    offset = Math.abs(offset);
    return sign + pad(Math.floor(offset / 60), 2) + ':' + pad(offset % 60, 2);
}

export function pad(number, length) {
    let str = String(number);
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}