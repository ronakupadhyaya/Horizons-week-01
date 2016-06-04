"use strict";

function SearchTree(value, left, right) {
  // Call the Tree constructor with this object here
  // YOUR CODE HERE
  if (value === undefined) {
    throw new Error('Each tree node must have value');
  }
  Tree.call(this, value, left, right);
}

// Inherit from Tree here!
SearchTree.prototype = new Tree(); // XXX

SearchTree.prototype.contains = function(n) {
  // YOUR CODE HERE
  if (n === this.value) {
    return true;
  }

  if (n < this.value) {
    return this.left && this.left.contains(n);
  }

  if (n > this.value) {
    return this.right && this.right.contains(n);
  }

  return false;
}

SearchTree.prototype.min = function(n) {
  // YOUR CODE HERE
  if (this.left) {
    return this.left.max();
  }
  return this.value;
}

SearchTree.prototype.max = function(n) {
  // YOUR CODE HERE
  if (this.right) {
    return this.right.max();
  }
  return this.value;
}

// Return true if n is already stored, false otherwise.
SearchTree.prototype.add = function(n) {
  // YOUR CODE HERE
  if (n === this.value) {
    return true;
  }

  if (n < this.value) {
    if (this.left) {
      return this.left.add(n);
    } else {
      this.left = new SearchTree(n);
      return false;
    }
  }

  if (n > this.value) {
    if (this.right) {
      return this.right.add(n);
    } else {
      this.right = new SearchTree(n);
      return false;
    }
  }
}

// Return true if n is in this tree.
SearchTree.prototype.search = function(n) {
  if (this.value === n) {
    return true;
  }
  if (n < this.value) {
    return !! (this.left && this.left.search(n));
  }
  return !! (this.right && this.right.search(n));
}

// Return true if n is found, false otherwise.
SearchTree.prototype.remove = function(n, parent) {
  // YOUR CODE HERE
  if (n < this.value) {
    return this.left && this.left.remove(n, this);
  } else if (n > this.value) {
    return this.right && this.right.remove(n, this);
  } else { // n === this.value
    if (this.left && this.right) {
      // 2 children
      this.value = this.right.min();
      this.right.remove(this.value, this);
    } else if (! parent) { // this is the root
      if (this.left) {
        this.value = this.left.value;
        this.right = this.left.right;
        this.left = this.left.left;
      } else if (this.right) {
        this.value = this.right.value;
        this.left = this.right.left;
        this.right = this.right.right;
      }
    } else if (parent.left === this) {
      parent.left = this.left || this.right;
    } else if (parent.right === this) {
      parent.right = this.left || this.right;
    }
    return true;
  }
}

SearchTree.prototype.rebalance = function() {
  // YOUR CODE HERE
}

