"use strict";

window.fold = {};
// Underscore.js is a popular collection of JavaScript functions (aka a library).
// In this exercise we'll functions in Underscore using other functions in
// Underscore.

// Underscore function _.any(array, fun) returns true if fun(item) returns true
// for ANY item in an array.
// ex.
//  function greaterThan1(item) {
//    return item > greaterThan1;
//  }
//  _.any([], greaterThan1) -> false
//  _.any([1], greaterThan1) -> true
//  _.any([0, 1], greaterThan1) -> true
//  _.any([0, -1, 0, -2], greaterThan1) -> false

// Exercise 1. fold.contains(array, item) using _.any()
// Write a function that takes an array and an item and returns true if item is
// in array.
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
