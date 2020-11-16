const fs = require('fs');
const taskFile = 'SCC.txt';
const verticiesNumber = 875714;

function createAdjacencies(data, verticiesNumber) {
    const adjacencies = [];
    const adjacenciesReversed = [];

    for (let i = 0; i < verticiesNumber; i++) {
        adjacencies.push([]);
        adjacenciesReversed.push([]);
    }

    const dataArr = data.split('\n');
    for (let line of dataArr) {
        const [fromVertex, toVertex] = line.trim().split(' ');
        adjacencies[fromVertex - 1].push(toVertex - 1);
        adjacenciesReversed[toVertex - 1].push(fromVertex - 1);
    }

    return [adjacencies, adjacenciesReversed];
}

const connectedComponents = (adjacencies, adjacenciesReversed) => {
    let sccMode = false;
    let connectedComponentsCounter = 0;
    const connectedComponentsSizes = [];

    const dfs = (adjacencies, visited, stack, v) => {
        visited[v] = true;

        if (sccMode) {
            connectedComponentsSizes[connectedComponentsCounter - 1].push(v);
        }

        for (let neibor of adjacencies[v]) {
            if (!visited[neibor]) {
                visited[neibor] = true;

                dfs(adjacencies, visited, stack, neibor);
            }
        }

        stack.push(v);
    };

    let visited = adjacencies.map(() => false);
    const stack = [];

    for (let i = 0; i < adjacencies.length; i++) {
        if (!visited[i]) {
            dfs(adjacencies, visited, stack, i);
        }
    }

    visited = adjacencies.map(() => false);
    sccMode = true;

    while (stack.length > 0) {
        let x = stack.pop();
        if (!visited[x]) {
            connectedComponentsCounter++;
            connectedComponentsSizes[connectedComponentsCounter - 1] = [];
            dfs(adjacenciesReversed, visited, [], x);
        }
    }

    return connectedComponentsSizes
        .map((el) => el.length)
        .sort((a, b) => b - a)
        .slice(0, 5)
        .join(',');
};

const data = fs.readFileSync(taskFile, 'utf8');
const [adjacencies, adjacenciesReversed] = createAdjacencies(data, verticiesNumber);
const result = connectedComponents(adjacencies, adjacenciesReversed);

console.log(result); // Answer: 434821,968,459,313,211
