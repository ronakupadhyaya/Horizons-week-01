'use strict';

window.comp = {};

// In this exercise, you are going to take the following array of basic values
// for all different types - from booleans to numbers to arrays -

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

var valuesToCheck = function() {
  return [true, false, 1, 0, -1, "true", "false", "1", "0", 
    "-1", "", null, undefined, Infinity, -Infinity, [], {}, [[]], [0], [1], NaN];
}

var twoD = valuesToCheck().map(item1 => {
  return valuesToCheck().map(item2 => {
    return [item1, item2];
  })
});
/* console.log(twoD); */

var obj1 = {};
twoD.forEach(item1 => {
  item1.forEach(item2 => {
    /* console.log(item2[0], item2[1]) */
    /* console.log(item2.join('_')); */
    /* obj[item2.join('_')] = item2[0] == item2[1]; */

    var str1, str2;

    if (Object.prototype.toString.call(item2[0]) === '[object Array]') {
      str1 = '[]';
    }
    else if (Object.prototype.toString.call(item2[0]) === '[object Object]') {
      str1 = '{}';
    }
    else if (item2[0] === "true") {
      str1 = '"true"';
    }
    else if (item2[0] === "false") {
      str1 = '"false"';
    }
    else if (item2[0] === "") {
      str1 = '""';
    }
    else if (item2[0] === "0") {
      str1 = '"0"';
    }
    else if (item2[0] === "-1") {
      str1 = '"-1"';
    }
    else {
      str1 = item2[0] + '';
    }

    if (Object.prototype.toString.call(item2[1]) === '[object Array]') {
      str2 = '[]';
    }
    else if (Object.prototype.toString.call(item2[1]) === '[object Object]') {
      str2 = '{}';
    }
    else if (item2[1] === "true") {
      str2 = '"true"';
    }
    else if (item2[1] === "false") {
      str2 = '"false"';
    }
    else if (item2[1] === "0") {
      str2 = '"0"';
    }
    else if (item2[1] === "") {
      str2 = '""';
    }
    else if (item2[1] === "-1") {
      str2 = '"-1"';
    }
    else {
      str2 = item2[1] + '';
    }

    var joined = [str1, str2].join('_');


    if (joined === '[]_false') {
      if (_.isEqual(item2[0], [])) {
        obj1[joined] = item2[0] == item2[1];
      }
    }
    else {
      obj1[joined] = item2[0] == item2[1]
    }
  })
});

var obj2 = {};
twoD.forEach(item1 => {
  item1.forEach(item2 => {
    var str1, str2;
    if (Object.prototype.toString.call(item2[0]) === '[object Array]') {
      str1 = '[]';
    }
    else if (Object.prototype.toString.call(item2[0]) === '[object Object]') {
      str1 = '{}';
    }
    else if (item2[0] === "true") {
      str1 = '"true"';
    }
    else if (item2[0] === "false") {
      str1 = '"false"';
    }
    else if (item2[0] === "") {
      str1 = '""';
    }
    else if (item2[0] === "0") {
      str1 = '"0"';
    }
    else if (item2[0] === "-1") {
      str1 = '"-1"';
    }
    else {
      str1 = item2[0] + '';
    }

    if (Object.prototype.toString.call(item2[1]) === '[object Array]') {
      str2 = '[]';
    }
    else if (Object.prototype.toString.call(item2[1]) === '[object Object]') {
      str2 = '{}';
    }
    else if (item2[1] === "true") {
      str2 = '"true"';
    }
    else if (item2[1] === "false") {
      str2 = '"false"';
    }
    else if (item2[1] === "0") {
      str2 = '"0"';
    }
    else if (item2[1] === "") {
      str2 = '""';
    }
    else if (item2[1] === "-1") {
      str2 = '"-1"';
    }
    else {
      str2 = item2[1] + '';
    }

    var joined = [str1, str2].join('_');


    if (joined === '[]_false') {
      if (_.isEqual(item2[0], [])) {
        obj2[joined] = item2[0] === item2[1];
      }
    }
    else {
      obj2[joined] = item2[0] === item2[1]
    }
  })
});
comp.testLooseEquality = function() {
  return obj1
};

comp.testStrictEquality = function() {
  return obj2
  // YOUR CODE HERE
};
