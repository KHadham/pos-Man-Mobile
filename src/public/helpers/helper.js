export const angkaRP = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
};

export const text = (text) => {
    if (text.length > 34) {
        let textSplit = text.substr(0, 30)
        return `${textSplit} ...`
    } else {
        let textSplit = text
        return `${textSplit}`
    }
}

