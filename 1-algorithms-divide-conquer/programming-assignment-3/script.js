let count;

function quickSort(arr, pivotRuleTask) {
    // Stop recusrion, because if array items less than 2 it is sorted
    if (arr.length < 2) return arr;

    count = count + arr.length - 1;

    let pivotIndex = 0; // For the pivotRuleTask #1: always using first element of the array as the pivot element.

    // For the pivotRuleTask #2: always using the final element of the given array as the pivot element
    if (pivotRuleTask === 2) {
        pivotIndex = arr.length - 1;
    }

    // For the pivotRuleTask #3: always using using the "median-of-three" pivot rule
    if (pivotRuleTask === 3) {
        let firstEl = arr[0];
        let middleEl = arr[Math.floor((arr.length - 1) / 2)];
        let lastEl = arr[arr.length - 1];

        pivotElement = [firstEl, middleEl, lastEl].sort((a, b) => a - b)[1];
        pivotIndex = arr.findIndex((el) => el === pivotElement);
    }

    // Swap pivot element to the start of array
    [arr[0], arr[pivotIndex]] = [arr[pivotIndex], arr[0]];

    let i = 0;
    for (j = 1; j < arr.length; j++) {
        if (arr[j] < arr[0]) {
            i++;
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
    }

    // Swap first element(pivot) to its final position
    [arr[i], arr[0]] = [arr[0], arr[i]];

    // Divide arrays for 2 parts < and > pivot
    let leftSide = arr.splice(0, i);
    let rightSide = arr.splice(1);

    // Recursion
    return [...quickSort(leftSide, pivotRuleTask), ...arr, ...quickSort(rightSide, pivotRuleTask)];
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

    count = 0;
    quickSort([...arr], 1);
    console.log('task1:', count); // 162085

    count = 0;
    quickSort([...arr], 2);
    console.log('task2:', count); // 164123

    count = 0;
    quickSort([...arr], 3);
    console.log('task3:', count); // 138382
}

processLineByLine('QuickSort.txt');
