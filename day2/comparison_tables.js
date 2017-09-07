'use strict';

window.comp = {};

// In this exercise, you are going to take the following array of basic values
// for all different types - from booleans to numbers to arrays -

var valuesToCheck = function() {
  return [null, [],true, false, 1, 0, -1, "true", "false", "1", "0",
"-1", "", undefined, Infinity, -Infinity, {}, [[]], [0], [1], NaN];
}

// and you will write the following:

// 1. A function that evaluates the loosely equal (==) truth value of each value
// in valuesToCheck with every other value in valuesToCheck
// 2. A function that evaluates the striclty equal (===) truth value of each value
// in valuesToCheck with every other value in valuesToCheck

// Both functions should return the result in an object structured like the
// following:

// ex. comp.testLooseEquality(s) ->
// {"true_true": true, "true_false": false, "true_1": true, "true_0": false, ...}

// ex. comp.testStrictEquality(s) ->
// {"true_true": true, "true_false": false, "true_1": false, "true_0": false, ...}

// Each property's key value should be formatted as:
// valuesToCheck[someIndex]_valuesToCheck[anotherIndex]
// such that the return object has all keys of possible combinations of
// valuesToCheck, from true_true to NaN_NaN.

// Note: Allow for redundancies; you should have both true_false and false_true
// defined. For strings like "true", "false", "1", and "0", the property name
// should use double quotes. Be careful with this!

// Having trouble starting? Here's an idea for implementing testLooseEquality:

// First, create a 2D array for each of the valuesToCheck with the following
// subarrays: [true, true], [true, false], [true, 1], ...

// Next, find a way to evaluate the loose boolean equality comparison between
// index 0 and index 1 of the subarrays and determine how to map the result
// to an object with the format specified above.

// Good luck!

comp.testLooseEquality = function() {
  debugger;
  var arr1 = valuesToCheck();
  var arr2 = valuesToCheck();

  var results = {}
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {

      if (typeof arr1[i] === 'string') var char1 = "\"" + arr1[i] + "\""
      else if (arr1[i] instanceof Array && arr1[i].length === 0) var char1 = "[]"
      else if (typeof(arr1[i]) == 'object' && String(arr1[i]) === 'null') var char1 = String(null);
      else if (typeof(arr1[i]) == 'object') var char1 = "{}"
      else var char1 = arr1[i]

      if (typeof arr2[j] === 'string') var char2 = "\"" + arr2[j] + "\""
      else if (arr2[j] instanceof Array && arr2[j].length === 0) var char2 = "[]"
      else if (typeof(arr2[j]) == 'object' && String(arr2[j]) === 'null') var char2 = String(null);
      else if (typeof(arr2[j]) == 'object') var char2 = "{}"
      else var char2 = arr2[j]

      var line = char1 + "_" + char2;
      results[line] = (arr1[i] == arr2[j]);
    }
  }
  console.log(results);
  return results
};

comp.testStrictEquality = function() {
  var arr1 = valuesToCheck();
  var arr2 = valuesToCheck();

  var results = {}
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {

      if (typeof arr1[i] === 'string') var char1 = "\"" + arr1[i] + "\""
      else if (arr1[i] instanceof Array && arr1[i].length === 0) var char1 = "[]"
      else if (typeof(arr1[i]) == 'object' && String(arr1[i]) === 'null') var char1 = String(null);
      else if (typeof(arr1[i]) == 'object') var char1 = "{}"
      else var char1 = arr1[i]

      if (typeof arr2[j] === 'string') var char2 = "\"" + arr2[j] + "\""
      else if (arr2[j] instanceof Array && arr2[j].length === 0) var char2 = "[]"
      else if (typeof(arr2[j]) == 'object' && String(arr2[j]) === 'null') var char2 = String(null);
      else if (typeof(arr2[j]) == 'object') var char2 = "{}"
      else var char2 = arr2[j]

      var line = char1 + "_" + char2;
      results[line] = (arr1[i] === arr2[j]);
    }
  }
  console.log(results);
  return results
};
