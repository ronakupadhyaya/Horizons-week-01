"use strict";

function SearchTree(value, left, right) {
  // Call the Tree constructor with this object here
  // YOUR CODE HERE
  Tree.call(this, value, left, right);
}

// Inherit from Tree here!
// YOUR CODE HERE

SearchTree.prototype.contains = function(n) {
  // YOUR CODE HERE
}

SearchTree.prototype.min = function(n) {
  // YOUR CODE HERE
}

SearchTree.prototype.max = function(n) {
  // YOUR CODE HERE
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
}

// Search for given item item in this tree.  Return true if item is found,
// false otherwise.
SearchTree.prototype.search = function(n) {
  // YOUR CODE HERE
}

// Remove given item from this tree.
// Return true if item was found and removed and false if item was not found.
SearchTree.prototype.remove = function(n, parent) {
  // YOUR CODE HERE
}
