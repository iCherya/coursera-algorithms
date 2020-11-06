const x = '3141592653589793238462643383279502884197169399375105820974944592';
const y = '2718281828459045235360287471352662497757247093699959574966967627';

function karatsubaMultiplyLazy(x, y) {
    const xBigInt = BigInt(x);
    const yBigInt = BigInt(y);

    return xBigInt * yBigInt;
}

function karatsubaMultiply(x, y) {
    if (x.length < 10 && y.length < 10) {
        return x * y;
    }

    const n = x.length > y.length ? y.length : x.length;
    const m = Math.round(n / 2);

    const a = x.slice(0, x.length / 2);
    const b = x.slice(x.length / 2);
    const c = y.slice(0, y.length / 2);
    const d = y.slice(y.length / 2);

    const ac = karatsubaMultiply(a, c);
    const ad = karatsubaMultiply(a, d);
    const bc = karatsubaMultiply(b, c);
    const bd = karatsubaMultiply(b, d);

    return ac * Math.pow(10, 2 * m) + (ad + bc) * Math.pow(10, m) + bd;
}

console.log(karatsubaMultiply(x, y)); // 8.539734222673568e+126
console.log(karatsubaMultiplyLazy(x, y).toString()); // 8539734222673567065463550869546574495034888535765114961879601127067743044893204848617875072216249073013374895871952806582723184
