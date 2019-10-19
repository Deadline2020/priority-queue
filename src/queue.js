const MaxHeap = require('./max-heap.js');

class PriorityQueue {
  constructor(maxSize) {
    this.maxSize = maxSize || 30;
    this.heap = new MaxHeap();
  }

  push(data, priority) {
    if (this.size() < this.maxSize) {
      this.heap.push(data, priority);
    }
    else throw new Error('maximum size exceeded')
  }

  shift() {
    if (!this.isEmpty()) {
      return this.heap.pop();
    }
    else throw new Error('queue is empty');

  }

  size() {
    return this.heap.size();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}

module.exports = PriorityQueue;
