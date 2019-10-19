const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  push(data, priority) {
    let newNode = new Node(data, priority);
    this.insertNode(newNode);
    this.shiftNodeUp(newNode);
  }

  pop() {
    if (!this.isEmpty()) {
      this.heapSize--;
      let tempRoot = this.detachRoot();
      this.restoreRootFromLastInsertedNode(tempRoot);
      this.shiftNodeDown(this.root);
      return tempRoot.data;
    }
  }

  detachRoot() {
    if (~this.parentNodes.indexOf(this.root)) this.parentNodes.shift();
    let detachedRoot = this.root;
    this.root = null;
    return detachedRoot;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (!this.isEmpty()) {
      let lastInsNode = this.parentNodes.pop()

      if (!this.parentNodes.length) {
        this.parentNodes.push(lastInsNode)
      } else if (lastInsNode.parent === detached) {
        this.parentNodes.unshift(lastInsNode)
      } else if (this.parentNodes.indexOf(lastInsNode.parent) < 0) {
        this.parentNodes.unshift(lastInsNode.parent)
      }

      lastInsNode.remove();
      if (detached.left && detached.left !== lastInsNode) lastInsNode.appendChild(detached.left);
      if (detached.right && detached.right !== lastInsNode) lastInsNode.appendChild(detached.right);
      this.root = lastInsNode;
    }
  }

  size() {
    return this.heapSize;
  }

  isEmpty() {
    return !this.heapSize || false;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  insertNode(node) {
    this.parentNodes.push(node);
    if (this.isEmpty()) {
      this.root = node;
    } else {
      this.parentNodes[0].appendChild(node);
    }
    if (this.parentNodes[0].left && this.parentNodes[0].right) {
      this.parentNodes.shift();
    }
    this.heapSize++;
  }

  shiftNodeUp(node) {
    if (!node.parent) {
      this.root = node;
      return;
    }

    if (node.priority > node.parent.priority) {
      let indexNode = this.parentNodes.indexOf(node);
      let indexParent = this.parentNodes.indexOf(node.parent);

      if (~indexNode) this.parentNodes[indexNode] = node.parent;
      if (~indexParent) this.parentNodes[indexParent] = node;

      node.swapWithParent();
      this.shiftNodeUp(node);
    }
  }

  shiftNodeDown(node) {
    if (node && (node.left || node.right)) {
      let changingNode;
      if (node.left && node.right) {
        changingNode = node.left.priority > node.right.priority ? node.left : node.right;
      }
      else changingNode = node.left || node.right;

      if (changingNode.priority > node.priority) {
        let indexNode = this.parentNodes.indexOf(node);
        let indexChangingNode = this.parentNodes.indexOf(changingNode);

        if (~indexNode) this.parentNodes[indexNode] = changingNode;
        if (~indexChangingNode) this.parentNodes[indexChangingNode] = node;

        changingNode.swapWithParent();
        if (!changingNode.parent) this.root = changingNode;
        this.shiftNodeDown(node);
      }
    }
  }
}

module.exports = MaxHeap;
