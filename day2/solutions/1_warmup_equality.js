"use strict";

window.truthy = {};

// Exercise 2. truthy.isSortOfEqual(a, b)
// Write a function that takes two arguments, `a` and `b`, and returns true or false when a and b are sort of the same.
// ex. truthy.isSortOfEqual(1, 1) -> true
// ex. truthy.isSortOfEqual(1, 0) -> false
// ex. truthy.isSortOfEqual('1', 1) -> true
// ex. truthy.isSortOfEqual('', ' ') -> false
// ex. truthy.isSortOfEqual([ 'a', 'b' ], 'a') -> false
// ex. truthy.isSortOfEqual([ 'a', 'b' ], { 0: 'a', 1: 'b'}) -> false
// ex. truthy.isSortOfEqual({ 0: 'a', 1: 'b'}, { 0: 'a', 1: 'b'}) -> false
///
// hint. use `==` to compare
// hint. see: http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
truthy.isSortOfEqual = function(a, b) {
  // YOUR CODE HERE
  return a == b;
};

// Exercise 5. truthy.isReallyEquals(a<number>, b<number>)
// Write a function that takes two strings as arguments, `a` and `b`, and returns true or false when a and b are equal.
// Write a function that takes two numbers as arguments, `a` and `b`, and returns true or false when a and b are equal.
// ex. truthy.compareStr('john', 'John') -> false
// ex. truthy.compareStr('xDvz7h$k', 'xDvz7h$k') -> true
// ex. truthy.isReallyEquals(1, 1) -> true
// ex. truthy.isReallyEquals(1, 0) -> false
// ex. truthy.isReallyEquals(1, 1.000000000000000000000000000000001) -> true
//
truthy.isReallyEquals = function(a, b) {
  // YOUR CODE HERE
  return a === b;
};
