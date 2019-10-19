class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (!this.left) {
      this.left = node;
      node.parent = this;
    } else if (!this.right) {
      this.right = node;
      node.parent = this;
    }
  }

  removeChild(node) {
    if (this.left === node) {
      node.parent = null;
      this.left = null;
    } else if (this.right === node) {
      node.parent = null;
      this.right = null;
    } else throw new Error('no child');

  }

  remove() {
    if (!this.parent) return;
    this.parent.removeChild(this);
  }

  swapWithParent() {
    if (!this.parent) return;

    let myParent = this.parent;
    let myLeft = this.left;
    let myRight = this.right;
    let parentMyParent = myParent.parent;

    if (parentMyParent) {
      if (myParent === myParent.parent.left) myParent.parent.left = this;
      if (myParent === myParent.parent.right) myParent.parent.right = this;
    }

    if (this === myParent.left) {
      this.right = myParent.right;
      if (myParent.right) myParent.right.parent = this;
      this.left = myParent;
    }

    if (this === myParent.right) {
      this.left = myParent.left;
      if (myParent.left) myParent.left.parent = this;
      this.right = myParent;
    }
    if (myLeft) myLeft.parent = myParent;
    if (myRight) myRight.parent = myParent;

    myParent.parent = this;
    myParent.left = myLeft;
    myParent.right = myRight;
    this.parent = parentMyParent;
  }
}

module.exports = Node;
