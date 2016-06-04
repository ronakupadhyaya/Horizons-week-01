"use strict";

function Tree(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
}

Tree.prototype.getSize = function() {
  // YOUR CODE HERE
  if (this.value === undefined) {
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


Tree.prototype.height = function(fn) {
  // YOUR CODE HERE
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

Tree.prototype.preOrder = function(fn) {
  // YOUR CODE HERE
  fn(this.value);
  if (this.left) {
    this.left.inOrder(fn);
  }
  if (this.right) {
    this.right.inOrder(fn);
  }
};

Tree.prototype.postOrder = function(fn) {
  // YOUR CODE HERE
  if (this.left) {
    this.left.inOrder(fn);
  }
  if (this.right) {
    this.right.inOrder(fn);
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
