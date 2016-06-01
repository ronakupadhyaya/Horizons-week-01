"use strict";

window.truthy = {};

// Exercise. truthy.isSortOfEqual(a, b)
// Write a function that takes two arguments, `a` and `b`, and returns true or false when a and b are sort of the same.
// ex. truthy.isSortOfEqual(1, 1) -> true
// ex. truthy.isSortOfEqual(1, 0) -> false
// ex. truthy.isSortOfEqual('1', 1) -> true
// ex. truthy.isSortOfEqual('', ' ') -> false
// ex. truthy.isSortOfEqual([ 'a', 'b' ], 'a') -> false
// ex. truthy.isSortOfEqual([ 'a', 'b' ], { 0: 'a', 1: 'b'}) -> false
// ex. truthy.isSortOfEqual({ 0: 'a', 1: 'b'}, { 0: 'a', 1: 'b'}) -> false
truthy.isSortOfEqual = function(a, b) {
  // YOUR CODE HERE
};

// Exercise. truthy.isReallyEquals(a, b)
// Write a function that takes two  arguments, `a` and `b`, and returns true or false when a and b are equal.
// ex. truthy.compareStr('john', 'John') -> false
// ex. truthy.compareStr('xDvz7h$k', 'xDvz7h$k') -> true
// ex. truthy.isReallyEquals('1', 1) -> false
// ex. truthy.isReallyEquals(1, 1) -> true
// ex. truthy.isReallyEquals(1, 0) -> false
// ex. truthy.isReallyEquals(1, 1.000000000000000000000000000000001) -> true
truthy.isReallyEquals = function(a, b) {
  // YOUR CODE HERE
};
