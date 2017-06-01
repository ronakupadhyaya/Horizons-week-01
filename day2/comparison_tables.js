'use strict';

window.comp = {};

// In this exercise, you are going to take the following array of basic values
// for all different types - from booleans to numbers to arrays -

var valuesToCheck = function() {
  return [true, false, 1, 0, -1, "true", "false", "1", "0",
    "-1", "", null, undefined, Infinity, -Infinity, [], {}, [[]], [0], [1], NaN];
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
  var arr = [];
  var vals1 = valuesToCheck();
  var vals2 = valuesToCheck()
  for (var i = 0; i < vals1.length; i++) {
    for (var j = 0; j < vals1.length; j++) {
      arr.push([vals1[i], vals2[j]]);
    }
  }
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var one = arr[i].slice(0, 1);
    one = one[0];
    var two = arr[i].slice(1, 2);
    two = two[0];

    if (typeof one === "number" && typeof two === "number") {
      obj[one +"_"+two] = one == two;
    } else if (typeof one === "number") {
      obj[one +"_"+ JSON.stringify(two)] = one == two;
    } else if (typeof two === "number") {
      obj[JSON.stringify(one) +"_"+ two] = one == two;
    } else {
      obj[JSON.stringify(one) +"_"+ JSON.stringify(two)] = one == two;
    }
  }
  return obj;
};

comp.testStrictEquality = function() {
  var arr = [];
  var vals1 = valuesToCheck();
  var vals2 = valuesToCheck()
  for (var i = 0; i < vals1.length; i++) {
    for (var j = 0; j < vals1.length; j++) {
      arr.push([vals1[i], vals2[j]]);
    }
  }
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var one = arr[i][0];
    var two = arr[i][1];

    if (typeof one === "number" && typeof two === "number") {
      obj[one +"_"+two] = one === two;
    } else if (typeof one === "number") {
      obj[one +"_"+ JSON.stringify(two)] = one === two;
    } else if (typeof two === "number") {
      obj[JSON.stringify(one) +"_"+ two] = one === two;
    } else {
      obj[JSON.stringify(one) +"_"+ JSON.stringify(two)] = one === two;
    }
  }
  return obj;
};
