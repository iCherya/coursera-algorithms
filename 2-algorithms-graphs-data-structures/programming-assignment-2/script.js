const shortestPathTo = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197];
const startVertice = 1;

function dijkstra(adjacencies, cost, from, to) {
    let n = adjacencies.length;
    const dist = new Array(n).fill(Infinity);
    dist[from] = 0;

    const dist2 = [...dist];

    while (n) {
        let u = dist2.indexOf(Math.min(...dist2));
        dist2[u] = Infinity;

        for (let i = 0; i < adjacencies[u].length; i++) {
            let v = adjacencies[u][i];
            if (dist[v] > dist[u] + cost[u][i]) {
                dist[v] = dist[u] + cost[u][i];
                dist2[v] = dist[v];
            }
        }

        n--;
    }

    return dist[to] === Infinity ? -1 : dist[to];
}

function getData(taskFile) {
    const fs = require('fs');
    const data = fs.readFileSync(taskFile, 'utf8');

    const adjacencies = [['empty']], // since 1-based counting
        cost = [['empty']]; // since 1-based counting

    const dataArr = data.split('\n');
    for (let line of dataArr) {
        if (line !== '') {
            const lineArr = line.trim().split('\t');
            const from = parseInt(lineArr.shift());
            adjacencies.push([]);
            cost.push([]);

            for (let verticeData of lineArr) {
                const [vertice, weight] = verticeData.split(',').map(Number);
                adjacencies[from].push(vertice);
                cost[from].push(weight);
            }
        }
    }

    return [adjacencies, cost];
}

function solve(shortestPathTo, startVertice, adjacencies, cost) {
    const result = [];

    for (let finishVertice of shortestPathTo) {
        const path = dijkstra(adjacencies, cost, startVertice, finishVertice);

        result.push(path);
    }

    return result.join(',');
}

const [adjacencies, cost] = getData('dijkstraData.txt');
console.log(solve(shortestPathTo, startVertice, adjacencies, cost)); // Answer: 2599,2610,2947,2052,2367,2399,2029,2442,2505,3068
