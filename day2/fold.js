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

// Underscore function _.reduce
// XXX explain reduce
//
// ex.
//  function sum(a, b) {
//    return a + b;
//  }
//  fold.fold([1], sum) -> 1
//  fold.fold([1, 2], sum) -> 3
//  fold.fold([1, 2, -3], sum) -> 0
//  fold.fold([1, -1, 2, -3], sum) -> -1
//  fold.fold([0], sum) -> 0
//
// ex. _.all() using fold
//  function and(a, b) {
//    return a && b;
//  }
//  fold.fold([true], and) -> true
//  fold.fold([true, true, true], and) -> true
//  fold.fold([true, false], and) -> false
//  fold.fold([true, false, true, true], and) -> false
//  fold.fold([false], and) -> false
//  fold.fold([false, false], and) -> false
fold.fold = function(array, fun) {
  // YOUR CODE HERE
  if (! array.length) {
    return;
  }

  var ret = array[0];
  for (var i = 1; i < array.length; i++) {
    ret = fun(ret, array[i]);
  }
  return ret;
}

// Underscore function _.forEach()
// JavaScript's built in .forEach() is useful for iterating over all items of an array.
// _.forEach() allows us to do the same with objects
//
// _.forEach({a: 5, b: 11},
//           function(value, key) { console.log(value, key) }) -> outputs: 5  a
//
// Exercise XXX: fold.keys(object)
// Write a function using _.forEach() that takes an object and returns an array with
// all the keys in that object.
//
// ex. fold.keys({}) -> []
// ex. fold.keys({a: 1, hello: 10}) -> ['a', 'hello']
fold.keys = function(object) {
  // YOUR CODE HERE
  var ret = [];
  _.forEach(object, function(value, key) {
    ret.push(key);
  });
  return ret;
}

// Exercise XXX: fold.values(object)
// Write a function using _.forEach() that takes an object and returns an array with
// all the values in that object.
//
// ex. fold.values({}) -> []
// ex. fold.values({a: 1, hello: 10}) -> [1, 10]
fold.values = function(object) {
  // YOUR CODE HERE
  var ret = [];
  _.forEach(object, function(value, key) {
    ret.push(value);
  });
  return ret;
}

// Exercise XXX: fold.pairs(object)
// Write a function using _.forEach() that takes an object and returns an array with
// all the key value pairs in that object.
//
// ex. fold.pairs({}) -> []
// ex. fold.pairs({a: 1, hello: 10}) -> [['a', 1], ['hello', 10]]
fold.pairs = function(object) {
  // YOUR CODE HERE
  var ret = [];
  _.forEach(object, function(value, key) {
    ret.push([key, value]);
  });
  return ret;
}

// Underscore function _.groupBy()
// Example XXX: groupByState(people)
// This funciton takes an array of people objects and groups them by state
// People objects have two properties: name and state.
//
// ex.
//  var people = [
//    {name: 'Darwish', state: 'GA'},
//    {name: 'Moose', state: 'CA'},
//    {name: 'Lane', state: 'PA'},
//    {name: 'Ethan', state: 'CA'},
//    {name: 'Josh', state: 'NJ'},
//    {name: 'Edward', state: 'FR'},
//    {name: 'Abhi', state: 'GA'}
//  ];
//
//  groupByState(people) ->
//      {
//        "GA": [
//          { "name": "Darwish", "state": "GA" },
//          { "name": "Abhi", "state": "GA" }
//        ],
//        "CA": [
//          { "name": "Moose", "state": "CA" },
//          { "name": "Ethan", "state": "CA" }
//        ],
//        "PA": [
//          { "name": "Lane", "state": "PA" }
//        ],
//        "NJ": [
//          { "name": "Josh", "state": "NJ" }
//        ],
//        "FR": [
//          { "name": "Edward", "state": "FR" }
//        ]
//      }
function groupByState(people) {
  return _.groupBy(people, function(person) {
    return person.state;
  });
}

//
// Underscore function _.countBy
// example
//
//
// Exercise implement countBy using groupBy
