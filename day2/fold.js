"use strict";

window.fold = {};

// Underscore.js is a popular collection of JavaScript functions (aka a library).
// http://underscorejs.org
//
// XXX explain end goal of this exercise
//
// Underscore function _.any(array, fun) returns true if fun(item) returns true
// for ANY item in an array.
// ex.
//  function greaterThan1(item) {
//    return item > 1;
//  }
//  _.any([], greaterThan1) -> false
//  _.any([1], greaterThan1) -> true
//  _.any([0, 1], greaterThan1) -> true
//  _.any([0, -1, 0, -2], greaterThan1) -> false

// Example XXX1. fold.hasZeros(array)
// This is a function that returns true if the given array contains any 0s in it
//
// ex. fold.hasZeros([]) -> false
// ex. fold.hasZeros([1]) -> false
// ex. fold.hasZeros([1, 0, 0]) -> true
// ex. fold.hasZeros([0]) -> true
fold.hasZeros = function(array) {
  return _.any(array, function(item) {
    return item === 0;
  });
}

// Exercise XXX1. fold.contains(array, item) using _.any()
// Write a function that takes an array and an item and returns true if item is
// in array. Use the underscore.js function _.any() to build this.
//
// ex. fold.contains([], 'a') -> false
// ex. fold.contains(['a'], 'a') -> true
// ex. fold.contains(['a', 'b', 'c'], 1) -> false
//
// Use _.any() to build fold.contains()
fold.contains = function(array, item) {
  // YOUR CODE HERE
  return _.any(array, function(i) {
    return i === item;
  })
};

// Underscore function _.reduce(array, fun)
// This function is also called foldl, short for fold-left.
//
// XXX exmplain reduce
//
// Exercise XXX2. fold.any(array, fun)
// Now let's implement our version of _.any()
//
// XXX explain how to do this
//
// Use: _.map() and _.reduce()
//
//
// ex.
//   function isTruthy(item) {
//     return !! item;
//   }
//   fold.any([], isTruthy) -> false
//   fold.any([0, 0], isTruthy) -> false
//   fold.any([0, 1, 0], isTruthy) -> true
//   fold.any([1], isTruthy) -> true
fold.any = function(array, fun) {
  // YOUR CODE HERE
  function or(a, b) {
    return a || b;
  }

  return _.reduce(_.map(array, fun), or);
}

// Underscore function _.fold
fold.fold = function(array, fun) {
}
