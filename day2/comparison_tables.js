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

comp.twoD = function() {
  var oneD1 = valuesToCheck();
  var oneD2 = valuesToCheck();
  var newArray = [];
  for (var a = 0; a < oneD1.length; a++) {
    for (var b = 0; b < oneD2.length; b++) {
      newArray.push([oneD1[a],oneD2[b]]);
    }
  }
  return newArray;
}

comp.checkQuote = function(word) {
  if (typeof word === 'string') {
    return "\"" + word + "\"";
  } else if (word !== null && typeof word === 'object') {
    if (word.length == 1) {
      if (typeof word[0] === 'object') {
        return "\[\[\]\]"
      } else {
        return "\[" + word[0].toString() +"\]";
      }
    } else if (word.length === undefined) {
      return "\{\}"
    } else {
      return "\[\]"
    }
  } else {
    return word
  }
}


comp.testLooseEquality = function() {
  var ans = {};
  //console.log(comp.twoD())
  _.forEach(comp.twoD(), function(value) {
    var comp1 = comp.checkQuote(value[0]);
    var comp2 = comp.checkQuote(value[1]);
    var compute = value[0] == value[1];
    ans[comp1 + "_" + comp2] = compute;
  });
  return ans;
};

comp.testStrictEquality = function() {
  var ans = {};
  _.forEach(comp.twoD(), function(value) {
    var comp1 = comp.checkQuote(value[0]);
    var comp2 = comp.checkQuote(value[1]);
    var compute = value[0] === value[1];
    ans[comp1 + "_" + comp2] = compute;
  });
  return ans;
};
