class Node {
    constructor(value) {
        this.value = value;
    }
}

class Heap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        const node = new Node(value);
        this.heap.push(node);
        this.siftUp(this.heap.length - 1);
    }
    extractRoot() {
        const rootIndex = 0;
        const rootNode = this.heap[rootIndex];
        this.heap[rootIndex] = this.heap.pop();
        this.siftDown(rootIndex);

        return rootNode;
    }
    getParentNodeIndex(nodeIndex) {
        return Math.floor((nodeIndex - 1) / 2);
    }
    swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

class MinHeap extends Heap {
    siftUp(nodeIndex) {
        while (nodeIndex > 0) {
            const node = this.heap[nodeIndex];
            const parentNodeIndex = this.getParentNodeIndex(nodeIndex);
            const parentNode = this.heap[parentNodeIndex];

            if (parentNode.value <= node.value) {
                break;
            }

            this.heap[nodeIndex] = parentNode;
            this.heap[parentNodeIndex] = node;
            nodeIndex = parentNodeIndex;
        }
    }

    siftDown(nodeIndex) {
        const leftChildIndex = 2 * nodeIndex + 1;
        const rightChildIndex = 2 * nodeIndex + 2;
        let swapCandinate = nodeIndex;

        const leftChildNode = this.heap[leftChildIndex];
        const rightChildNode = this.heap[rightChildIndex];
        const parentNode = this.heap[nodeIndex];

        if (!leftChildNode) return;

        if (leftChildNode.value < parentNode.value) {
            swapCandinate = leftChildIndex;
        }
        if (rightChildNode && rightChildNode.value < leftChildNode.value) {
            swapCandinate = rightChildIndex;
        }

        if (swapCandinate !== nodeIndex) {
            this.swap(this.heap, swapCandinate, nodeIndex);

            if (this.heap[rightChildIndex]) this.siftDown(swapCandinate);
        }
    }
}

class MaxHeap extends Heap {
    siftUp(nodeIndex) {
        while (nodeIndex > 0) {
            const node = this.heap[nodeIndex];
            const parentNodeIndex = this.getParentNodeIndex(nodeIndex);
            const parentNode = this.heap[parentNodeIndex];

            if (parentNode.value >= node.value) {
                break;
            }

            this.heap[nodeIndex] = parentNode;
            this.heap[parentNodeIndex] = node;
            nodeIndex = parentNodeIndex;
        }
    }

    siftDown(nodeIndex) {
        const leftChildIndex = 2 * nodeIndex + 1;
        const rightChildIndex = 2 * nodeIndex + 2;
        let swapCandinate = nodeIndex;

        const leftChildNode = this.heap[leftChildIndex];
        const rightChildNode = this.heap[rightChildIndex];
        const parentNode = this.heap[nodeIndex];

        if (!leftChildNode) return;

        if (leftChildNode.value > parentNode.value) {
            swapCandinate = leftChildIndex;
        }
        if (rightChildNode && rightChildNode.value > leftChildNode.value) {
            swapCandinate = rightChildIndex;
        }

        if (swapCandinate !== nodeIndex) {
            this.swap(this.heap, swapCandinate, nodeIndex);

            if (this.heap[rightChildIndex]) this.siftDown(swapCandinate);
        }
    }
}

function getData(taskFile) {
    const fs = require('fs');
    const data = fs.readFileSync(taskFile, 'utf8');

    return data.trim().split('\n').map(Number);
}

function computeMedianMaintenance(file) {
    let i = 0;
    const medians = [];

    const minHeap = new MinHeap();
    const maxHeap = new MaxHeap();

    const numbers = getData(file);

    for (const number of numbers) {
        i++;
        let current;

        if (i === 1) {
            current = number;
            medians.push(current);
            continue;
        }
        if (i === 2) {
            const smallerNumber = Math.min(medians[0], number);
            const largerNumber = Math.max(medians[0], number);

            current = smallerNumber;
            medians.push(current);

            maxHeap.insert(smallerNumber);
            minHeap.insert(largerNumber);
            continue;
        }

        const maxNode = maxHeap.heap[0];
        const minNode = minHeap.heap[0];
        if (number < maxNode.value) {
            maxHeap.insert(number);
        } else if (number > minNode.value) {
            minHeap.insert(number);
        } else {
            maxHeap.insert(number);
        }

        if (minHeap.heap.length - maxHeap.heap.length > 1) {
            const minNode = minHeap.extractRoot();
            maxHeap.insert(minNode.value);
        } else if (maxHeap.heap.length - minHeap.heap.length > 1) {
            const maxNode = maxHeap.extractRoot();
            minHeap.insert(maxNode.value);
        }

        if (i % 2 === 0) {
            current = maxHeap.heap[0].value;
        } else {
            if (maxHeap.heap.length > minHeap.heap.length) {
                current = maxHeap.heap[0].value;
            } else {
                current = minHeap.heap[0].value;
            }
        }
        medians.push(current);
    }

    const result = medians.reduce((prev, curr) => prev + curr, 0);

    return result % 10000;
}

console.log(computeMedianMaintenance('Median.txt')); // Answer: 1213
