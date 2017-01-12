"use strict";

window.copyToolbox = {};

// In this exercise, you will be implementing functions that will deep copy arrays
// and objects

// Exercise 1: Deep Array Copy
// Input on the first exercise, you will get an array that may contain nested arrays
// (arrays inside other arrays). You will create a function that copies the arrays
// and their nested arrays so changes on one never affect the other.

// ex. copyToolbox.deepArrayCopy([0, 1, 2, 3]) -> [0, 1, 2, 3]
// ex. copyToolbox.deepArrayCopy([1, 2, [4, 1]]) -> [1, 2, [4, 1]]]
// ex. copyToolbox.deepArrayCopy([[[1]]) -> [[[1]]]


copyToolbox.deepArrayCopy = function(arr) {
  if (arr instanceof Array) {
    var ret = [];
    for (var i = 0; i < arr.length; i++ ) {
      ret[i] = copyToolbox.deepArrayCopy(arr[i]);
    }
    return ret;
  }
  return arr;
};

// Exercise 2: Deep Object Copy

// Input on the first exercise, you will get an object that may contain nested objects
// (objects inside other objects) or any other data type except arrays. You will
// create a function that copies the arrays and their nested arrays so changes on
// one never affect the other. We have the following person object:

// var personA = {
//   ethan: sebastian,
//   title: instructor,
//   school: {
//     name:horizons,
//     address: "3879 23rd street, San Francisco, California 94114"
//   }
// }

// When doing copyToolbox.deepObjectCopy(personA)
// The copy should contain the same names+values
// Modyfing a sub-object on the copy should't modify the original
// The copy should contain a copy of the original's nested objects
// Sub-objects on copies on the copy should'nt be the same as on the original

copyToolbox.deepObjectCopy = function(obj) {
  if (obj instanceof Object) {
    var out = {}
    for (var key in obj ) {
      out[key] = copyToolbox.deepObjectCopy(obj[key]);
    }
    return out;
  }
  console.log(obj)
  return obj;
};
