"use strict";

function SearchTree(value, left, right) {
  // Call the Tree constructor with this object here
  // YOUR CODE HERE
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
    return this.left.min();
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

// Add given item to this tree.
// Return true if n was already stored in this tree before insertion, false
// otherwise.
//
// ex.
//  var t = new SearchTree();
//  t.add(1) -> false
//  t.add(1) -> true
SearchTree.prototype.add = function(n) {
  // YOUR CODE HERE
  if (this.value === null) {
    this.value = n;
    return false;
  }
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

// Search for given item item in this tree.  Return true if item is found,
// false otherwise.
SearchTree.prototype.search = function(n) {
  if (this.value === n) {
    return true;
  }
  if (n < this.value) {
    return !! (this.left && this.left.search(n));
  }
  return !! (this.right && this.right.search(n));
}

// Remove given item from this tree.
// Return true if item was found and removed and false if item was not found.
SearchTree.prototype.remove = function(n, parent) {
  // YOUR CODE HERE
  if (n < this.value) { // item is to the left
    return !! (this.left && this.left.remove(n, this));
  } else if (n > this.value) { // item is to the right
    return !! (this.right && this.right.remove(n, this));
  } else { // found item, n === this.value
    if (this.left && this.right) {
      // 2 children
      this.value = this.right.min();
      this.right.remove(this.value, this);
    } else if (this.left) {
      this.value = this.left.value;
      this.right = this.left.right;
      this.left = this.left.left;
    } else if (this.right) {
      this.value = this.right.value;
      this.left = this.right.left;
      this.right = this.right.right;
    } else { // leaf node
      if (! parent) {
        this.value = null;
      } else if (parent.left === this) {
        parent.left = null;
      } else if (parent.right === this) {
        parent.right = null;
      }
    }
    return true;
  }
}
