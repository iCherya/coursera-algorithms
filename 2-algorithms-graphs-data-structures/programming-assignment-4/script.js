function getData(taskFile) {
    const fs = require('fs');
    const data = fs.readFileSync(taskFile, 'utf8');

    return data.trim().split('\n').map(Number);
}

function sumToTarget(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];

        if (sum === target) {
            return true;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return false;
}

function twoSum(file, range) {
    const min = range[0];
    const max = range[1];

    const input = getData(file).sort((a, b) => a - b);

    let counter = 0;

    for (let i = min; i <= max; i++) {
        if (sumToTarget(input, i)) {
            counter++;
        }
    }

    return counter;
}

console.log(twoSum('2sum.txt', [-10000, 10000])); // Answer: 427
