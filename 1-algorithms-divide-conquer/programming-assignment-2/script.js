let inversionsCount = 0;

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const halfPoint = Math.ceil(arr.length / 2);
    const firstHalf = mergeSort(arr.splice(0, halfPoint));
    const secondHalf = mergeSort(arr.splice(-halfPoint));

    return merge(firstHalf, secondHalf);
}

function merge(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] > arr2[j]) {
            inversionsCount = inversionsCount + arr1.length - i;
            result.push(arr2[j]);
            j++;
        } else {
            result.push(arr1[i]);
            i++;
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

const fs = require('fs');
const readline = require('readline');

async function processLineByLine(file) {
    const fileStream = fs.createReadStream(file);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const arr = [];

    for await (const line of rl) {
        arr.push(parseInt(line));
    }

    mergeSort(arr);

    console.log(inversionsCount); // 2407905288
}

processLineByLine('IntegerArray.txt');
