const fs = require('fs');

fs.readFile('kargerMinCut.txt', 'utf8', function (err, content) {
    let i = 30; // Repeat times
    let mincuts = Infinity; // Minimum cuts value

    while (i > 0) {
        const result = mincut(content);
        if (result < mincuts) {
            mincuts = result;
        }
        i--;
    }

    console.log(mincuts); // 17
});

const mincut = (plainData) => {
    const nodes = createObjectFromTextData(plainData);

    mincutHelper = (obj) => {
        if (countProperties(obj) === 2) {
            return obj;
        }

        let edgeIndexes = chooseRandomEdge(obj); // Choose 2 vertices
        let cutted = cutEdge(edgeIndexes, obj); // Cut edges and return new graph

        return mincutHelper(cutted); // Recursion until 2 verticies left
    };

    let result = mincutHelper(nodes);

    // Such as 2 verities have similar amout of edges, return amount of first one
    for (let key in result) {
        return result[key].length;
    }
};

const createObjectFromTextData = (text) => {
    const nodes = {}; // Create empty object

    const rows = text.split('\n'); // Create array with subarrays of rows

    // Fill nodes object
    rows.forEach((el) => {
        let textRowArr = el.split('\t');
        textRowArr.pop();
        nodes[textRowArr[0]] = textRowArr.slice(1);
    });

    return nodes;
};

const chooseRandomEdge = (obj) => {
    let arrOfV1values = [];

    for (key in obj) {
        arrOfV1values.push(key);
    }

    const randomV1index = getRandomIntInclusive(0, arrOfV1values.length - 1);
    const randomV1value = arrOfV1values[randomV1index];

    const randomV2index = getRandomIntInclusive(0, obj[randomV1value].length - 1);
    const randomV2value = '' + obj[randomV1value][randomV2index];

    return [randomV1value, randomV2value];
};

const cutEdge = (edgeIndexes, nodes) => {
    // Chose verticies dependecies
    const from = nodes[edgeIndexes[1]];
    const to = nodes[edgeIndexes[0]];

    from.forEach((el) => to.push(el)); // Copy edges
    delete nodes[edgeIndexes[1]]; // Delete vertice

    // Update dependecies
    for (let i = 0; i < from.length; i++) {
        let connection = from[i];

        for (let k = 0; k < nodes[connection].length; k++) {
            if (nodes[connection][k] == edgeIndexes[1]) {
                nodes[connection][k] = edgeIndexes[0];
            }
        }
    }

    // Delete dublicates
    let newTo = to.filter((el) => {
        return el != edgeIndexes[0];
    });

    delete nodes[edgeIndexes[0]];
    nodes[edgeIndexes[0]] = newTo;

    return nodes;
};

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const countProperties = (obj) => {
    var count = 0;

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) ++count;
    }

    return count;
};
