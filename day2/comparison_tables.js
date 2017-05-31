'use strict';

window.comp = {};

// In this exercise, you are going to take the following array of basic values
// for all different types - from booleans to numbers to arrays -

var valuesToCheck = function() {
  return [true, false, 1, 0, -1, "true", "false", "1", "0",
    "-1", "", null, undefined, Infinity, -Infinity, [], {},
    [[]], [0], [1], NaN];
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

comp.getString = function(value) {
  // [true, false, 1, 0, -1, "true", "false", "1", "0",
  //  "-1", "", null, undefined, Infinity, -Infinity, [], {},
  //  [[]], [0], [1], NaN];
  if (value === null) {
    return "null";
  } else if (value === undefined) {
    return "undefined";
  } else if (typeof value === "boolean" || typeof value === "number") {
    return value.toString();
  } else if (typeof value === "string") {
    return "\\\"" + value + "\\\"";
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    } else if (typeof value[0] === "number"){
      return "[" + value[0] + "]";
    } else {
      return "[[]]";
    }
  } else {
    return "[{}]";
  }
}

comp.testLooseEquality = function() {
  var vals = valuesToCheck();
  var obj = {};

  var list = [];

  for(var i = 0; i<vals.length; i++) {
    for (var j = 0; j<vals.length; j++) {
      list.push([vals[i], vals[j]]);
    }
  }
  //console.log(list);
  var key = null;
  list.forEach(function(arr, index) {
    key = comp.getString(arr[0])+"_"+comp.getString(arr[1]);
    obj[key] = arr[0] == arr[1];
  })
  console.log(obj);
  return obj;
/*
  //var boolStr = "true";
  //var bool = true;
  var val = null;
  function runTest(boolStr, bool) {
    list.forEach(function (item) {
      var i = null;
      if (item !== null && item !== undefined) {
        i = item.toString()
      } else if (item === null) {
        i = "null";
      } else {
        i = "undefined";
      }
      val = boolStr+"_"+i;
      console.log(val);
      console.log(bool == item);
      obj[val] = (bool == item);
    })
  }

  runTest("true", true);
  runTest("false",false);
  return obj;
  */
};

comp.testStrictEquality = function() {
    // YOUR CODE HERE
};
