"use strict";

// This object represents a binary tree. In a binary tree, each node has 0, 1,
// or 2 children.
//
// We use this object to represent both the root node and the children.
//
// An empty tree is represented by a root node with no children and this.value === null.
//
// ex.
//  This:
//    new Tree('A', new Tree('B'), new Tree('C'))
//  Represents this:
//     A
//    / \
//   B   C
//
function Tree(value, left, right) {
  if (_.isUndefined(value) || _.isNull(value)) {
    value = null;
  }

  this.value = value;
  this.left = left;
  this.right = right;
}

// Get the size of this tree.
//
// The size of the tree can be defined recursively:
// size() = 1 + size(left child) + size(right child)
//
// An empty tree represented by a root node with no children
// and this.value === null;
Tree.prototype.getSize = function() {
  // YOUR CODE HERE
  if (this.value === null) {
    return 0;
  }
  var ret = 1;
  if (this.left) {
    ret += this.left.getSize();
  }
  if (this.right) {
   ret += this.right.getSize();
  }
  return ret;
};

// Get the height of the tree.
//
Tree.prototype.height = function(fn) {
  // YOUR CODE HERE
  if (this.value === null) {
    return 0;
  }

  var ret = 0;
  var h;

  if (this.left) {
    h = this.left.height();
    if (h > ret) {
      ret = h;
    }
  }

  if (this.right) {
    h = this.right.height();
    if (h > ret) {
      ret = h;
    }
  }

  return ret + 1;
}

// Perform an in order traversal of the tree.
//
// Steps for an in-order traversal:
//  - Visit left child
//  - This node
//  - Visit right child
Tree.prototype.inOrder = function(fn) {
  // YOUR CODE HERE
  if (this.left) {
    this.left.inOrder(fn);
  }
  fn(this.value);
  if (this.right) {
    this.right.inOrder(fn);
  }
};

// Perform a pre order traversal of the tree.
//
// Steps for an in-order traversal:
//  - This node
//  - Visit left child
//  - Visit right child
Tree.prototype.preOrder = function(fn) {
  // YOUR CODE HERE
  fn(this.value);
  if (this.left) {
    this.left.preOrder(fn);
  }
  if (this.right) {
    this.right.preOrder(fn);
  }
};

// Perform a post order traversal of the tree.
//
// Steps for an in-order traversal:
//  - Visit left child
//  - Visit right child
//  - This node
Tree.prototype.postOrder = function(fn) {
  // YOUR CODE HERE
  if (this.left) {
    this.left.postOrder(fn);
  }
  if (this.right) {
    this.right.postOrder(fn);
  }
  fn(this.value);
};

// Return true if both trees have the same shape
// and same items. False otherwise.
Tree.prototype.equals = function(tree) {
  // YOUR CODE HERE
  return tree &&
    this.value === tree.value &&
    (!this.left || this.left.equals(tree.left)) &&
    (!this.right || this.right.equals(tree.right));
};
