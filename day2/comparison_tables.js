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
// var valuesToCheck = function() {
//   return [true, false, 1, 0, -1, "true", "false", "1", "0",
//     "-1", "", null, undefined, Infinity, -Infinity, [], {}, [[]], [0], [1], NaN];

comp.testLooseEquality = function() {
    // YOUR CODE HERE
  var results  = {};
  var truthValues = valuesToCheck();
  var truthValues1 = valuesToCheck();
  for(var i = 0; i < truthValues.length; i ++){
    for(var j = 0; j < truthValues1.length; j++){
      var str1;
      var str2;

      if(typeof truthValues[i] === 'number' && isNaN(truthValues[i])) {
        str1 = 'NaN';
      } else {
        str1 = JSON.stringify(truthValues[i]);
      }
      if(typeof truthValues1[j] === 'number' && isNaN(truthValues1[j])) {
        str2 = 'NaN';
      } else {
        str2 = JSON.stringify(truthValues1[j]);
      }
      
      if(truthValues[i] === -Infinity) str1 = '-Infinity';
      if(truthValues[j] === -Infinity) str2 = '-Infinity';
      if(truthValues[i] === Infinity) str1 = 'Infinity';
      if(truthValues[j] === Infinity) str2 = 'Infinity';


      // if(truthValues[i] === undefined) str1 = 'undefined'
      // if(truthValues[j] === undefined) str2 = 'undefined'
      // if(truthValues[i] === -Infinity) str1 = '-Infinity'
      // if(truthValues[j] === -Infinity) str2 = '-Infinity'
      // if(typeof truthValues[i] === 'object' && truthValues[i].length === 0) str1 = '[]'
      // if(typeof truthValues[j] === 'object' && truthValues[j].length === 0) str1 = '[]'
      // if(typeof truthValues[i] === 'object' && truthValues[i].length === 0) str1 = '{}'


      // console.log(str1, str2, truthValues[i] == truthValues1[j])
      var key = str1 + '_' + str2;
      results[key] = truthValues[i] == truthValues1[j];
    }
  }
  return results;
};

comp.testStrictEquality = function() {
  // YOUR CODE HERE
  var results  = {};
  var truthValues = valuesToCheck();
  var truthValues1 = valuesToCheck();
  for(var i = 0; i < truthValues.length; i ++){
    for(var j = 0; j < truthValues1.length; j++){
      var str1;
      var str2;

      if(typeof truthValues[i] === 'number' && isNaN(truthValues[i])) {
        str1 = 'NaN';
      } else {
        str1 = JSON.stringify(truthValues[i]);
      }
      if(typeof truthValues1[j] === 'number' && isNaN(truthValues1[j])) {
        str2 = 'NaN';
      } else {
        str2 = JSON.stringify(truthValues1[j]);
      }
      if(truthValues[i] === -Infinity) str1 = '-Infinity';
      if(truthValues1[j] === -Infinity) str2 = '-Infinity';
      if(truthValues[i] === Infinity) str1 = 'Infinity';
      if(truthValues1[j] === Infinity) str2 = 'Infinity';

      // // NaN === NaN does not work
      // if (str1 === 'NaN' && str2 === 'NaN') {
      //   var key = str1 + '_' + str2;
      //   console.log(truthValues[i]);
      //   results[key] = isNaN(truthValues[i]);
      //   continue;
      // }

      var key = str1 + '_' + str2;
      results[key] = truthValues[i] === truthValues1[j];
    }
  }
  return results;
};
