'use strict';

window.comp = {};

// In this exercise, you are going to take the following array of basic values
// for all different types - from booleans to numbers to arrays -

var valuesToCheck = function() {
  return [true, false, 1, 0, -1, "true", "false", "1", "0",
"-1", "", null, undefined, Infinity, -Infinity, [], {}, [[]], [0], [1], NaN];
}

var valuesToCheck2 = function() {
  return [[]];
}
var ans = {
  "true_true": true,
  "true_false": false,
  "true_1": true,
  "true_0": false,
  "true_-1": false,
  "true_\"true\"": false,
  "true_\"false\"": false,
  "true_\"1\"": true,
  "true_\"0\"": false,
  "true_\"-1\"": false,
  "true_\"\"": false,
  "true_null": false,
  "true_undefined": false,
  "true_Infinity": false,
  "true_-Infinity": false,
  "true_[]": false,
  "true_{}": false,
  "true_[[]]": false,
  "true_[0]": false,
  "true_[1]": true,
  "true_NaN": false,
  "false_true": false,
  "false_false": true,
  "false_1": false,
  "false_0": true,
  "false_-1": false,
  "false_\"true\"": false,
  "false_\"false\"": false,
  "false_\"1\"": false,
  "false_\"0\"": true,
  "false_\"-1\"": false,
  "false_\"\"": true,
  "false_null": false,
  "false_undefined": false,
  "false_Infinity": false,
  "false_-Infinity": false,
  "false_[]": true,
  "false_{}": false,
  "false_[[]]": true,
  "false_[0]": true,
  "false_[1]": false,
  "false_NaN": false,
  "1_true": true,
  "1_false": false,
  "1_1": true,
  "1_0": false,
  "1_-1": false,
  "1_\"true\"": false,
  "1_\"false\"": false,
  "1_\"1\"": true,
  "1_\"0\"": false,
  "1_\"-1\"": false,
  "1_\"\"": false,
  "1_null": false,
  "1_undefined": false,
  "1_Infinity": false,
  "1_-Infinity": false,
  "1_[]": false,
  "1_{}": false,
  "1_[[]]": false,
  "1_[0]": false,
  "1_[1]": true,
  "1_NaN": false,
  "0_true": false,
  "0_false": true,
  "0_1": false,
  "0_0": true,
  "0_-1": false,
  "0_\"true\"": false,
  "0_\"false\"": false,
  "0_\"1\"": false,
  "0_\"0\"": true,
  "0_\"-1\"": false,
  "0_\"\"": true,
  "0_null": false,
  "0_undefined": false,
  "0_Infinity": false,
  "0_-Infinity": false,
  "0_[]": true,
  "0_{}": false,
  "0_[[]]": true,
  "0_[0]": true,
  "0_[1]": false,
  "0_NaN": false,
  "-1_true": false,
  "-1_false": false,
  "-1_1": false,
  "-1_0": false,
  "-1_-1": true,
  "-1_\"true\"": false,
  "-1_\"false\"": false,
  "-1_\"1\"": false,
  "-1_\"0\"": false,
  "-1_\"-1\"": true,
  "-1_\"\"": false,
  "-1_null": false,
  "-1_undefined": false,
  "-1_Infinity": false,
  "-1_-Infinity": false,
  "-1_[]": false,
  "-1_{}": false,
  "-1_[[]]": false,
  "-1_[0]": false,
  "-1_[1]": false,
  "-1_NaN": false,
  "\"true\"_true": false,
  "\"true\"_false": false,
  "\"true\"_1": false,
  "\"true\"_0": false,
  "\"true\"_-1": false,
  "\"true\"_\"true\"": true,
  "\"true\"_\"false\"": false,
  "\"true\"_\"1\"": false,
  "\"true\"_\"0\"": false,
  "\"true\"_\"-1\"": false,
  "\"true\"_\"\"": false,
  "\"true\"_null": false,
  "\"true\"_undefined": false,
  "\"true\"_Infinity": false,
  "\"true\"_-Infinity": false,
  "\"true\"_[]": false,
  "\"true\"_{}": false,
  "\"true\"_[[]]": false,
  "\"true\"_[0]": false,
  "\"true\"_[1]": false,
  "\"true\"_NaN": false,
  "\"false\"_true": false,
  "\"false\"_false": false,
  "\"false\"_1": false,
  "\"false\"_0": false,
  "\"false\"_-1": false,
  "\"false\"_\"true\"": false,
  "\"false\"_\"false\"": true,
  "\"false\"_\"1\"": false,
  "\"false\"_\"0\"": false,
  "\"false\"_\"-1\"": false,
  "\"false\"_\"\"": false,
  "\"false\"_null": false,
  "\"false\"_undefined": false,
  "\"false\"_Infinity": false,
  "\"false\"_-Infinity": false,
  "\"false\"_[]": false,
  "\"false\"_{}": false,
  "\"false\"_[[]]": false,
  "\"false\"_[0]": false,
  "\"false\"_[1]": false,
  "\"false\"_NaN": false,
  "\"1\"_true": true,
  "\"1\"_false": false,
  "\"1\"_1": true,
  "\"1\"_0": false,
  "\"1\"_-1": false,
  "\"1\"_\"true\"": false,
  "\"1\"_\"false\"": false,
  "\"1\"_\"1\"": true,
  "\"1\"_\"0\"": false,
  "\"1\"_\"-1\"": false,
  "\"1\"_\"\"": false,
  "\"1\"_null": false,
  "\"1\"_undefined": false,
  "\"1\"_Infinity": false,
  "\"1\"_-Infinity": false,
  "\"1\"_[]": false,
  "\"1\"_{}": false,
  "\"1\"_[[]]": false,
  "\"1\"_[0]": false,
  "\"1\"_[1]": true,
  "\"1\"_NaN": false,
  "\"0\"_true": false,
  "\"0\"_false": true,
  "\"0\"_1": false,
  "\"0\"_0": true,
  "\"0\"_-1": false,
  "\"0\"_\"true\"": false,
  "\"0\"_\"false\"": false,
  "\"0\"_\"1\"": false,
  "\"0\"_\"0\"": true,
  "\"0\"_\"-1\"": false,
  "\"0\"_\"\"": false,
  "\"0\"_null": false,
  "\"0\"_undefined": false,
  "\"0\"_Infinity": false,
  "\"0\"_-Infinity": false,
  "\"0\"_[]": false,
  "\"0\"_{}": false,
  "\"0\"_[[]]": false,
  "\"0\"_[0]": true,
  "\"0\"_[1]": false,
  "\"0\"_NaN": false,
  "\"-1\"_true": false,
  "\"-1\"_false": false,
  "\"-1\"_1": false,
  "\"-1\"_0": false,
  "\"-1\"_-1": true,
  "\"-1\"_\"true\"": false,
  "\"-1\"_\"false\"": false,
  "\"-1\"_\"1\"": false,
  "\"-1\"_\"0\"": false,
  "\"-1\"_\"-1\"": true,
  "\"-1\"_\"\"": false,
  "\"-1\"_null": false,
  "\"-1\"_undefined": false,
  "\"-1\"_Infinity": false,
  "\"-1\"_-Infinity": false,
  "\"-1\"_[]": false,
  "\"-1\"_{}": false,
  "\"-1\"_[[]]": false,
  "\"-1\"_[0]": false,
  "\"-1\"_[1]": false,
  "\"-1\"_NaN": false,
  "\"\"_true": false,
  "\"\"_false": true,
  "\"\"_1": false,
  "\"\"_0": true,
  "\"\"_-1": false,
  "\"\"_\"true\"": false,
  "\"\"_\"false\"": false,
  "\"\"_\"1\"": false,
  "\"\"_\"0\"": false,
  "\"\"_\"-1\"": false,
  "\"\"_\"\"": true,
  "\"\"_null": false,
  "\"\"_undefined": false,
  "\"\"_Infinity": false,
  "\"\"_-Infinity": false,
  "\"\"_[]": true,
  "\"\"_{}": false,
  "\"\"_[[]]": true,
  "\"\"_[0]": false,
  "\"\"_[1]": false,
  "\"\"_NaN": false,
  "null_true": false,
  "null_false": false,
  "null_1": false,
  "null_0": false,
  "null_-1": false,
  "null_\"true\"": false,
  "null_\"false\"": false,
  "null_\"1\"": false,
  "null_\"0\"": false,
  "null_\"-1\"": false,
  "null_\"\"": false,
  "null_null": true,
  "null_undefined": true,
  "null_Infinity": false,
  "null_-Infinity": false,
  "null_[]": false,
  "null_{}": false,
  "null_[[]]": false,
  "null_[0]": false,
  "null_[1]": false,
  "null_NaN": false,
  "undefined_true": false,
  "undefined_false": false,
  "undefined_1": false,
  "undefined_0": false,
  "undefined_-1": false,
  "undefined_\"true\"": false,
  "undefined_\"false\"": false,
  "undefined_\"1\"": false,
  "undefined_\"0\"": false,
  "undefined_\"-1\"": false,
  "undefined_\"\"": false,
  "undefined_null": true,
  "undefined_undefined": true,
  "undefined_Infinity": false,
  "undefined_-Infinity": false,
  "undefined_[]": false,
  "undefined_{}": false,
  "undefined_[[]]": false,
  "undefined_[0]": false,
  "undefined_[1]": false,
  "undefined_NaN": false,
  "Infinity_true": false,
  "Infinity_false": false,
  "Infinity_1": false,
  "Infinity_0": false,
  "Infinity_-1": false,
  "Infinity_\"true\"": false,
  "Infinity_\"false\"": false,
  "Infinity_\"1\"": false,
  "Infinity_\"0\"": false,
  "Infinity_\"-1\"": false,
  "Infinity_\"\"": false,
  "Infinity_null": false,
  "Infinity_undefined": false,
  "Infinity_Infinity": true,
  "Infinity_-Infinity": false,
  "Infinity_[]": false,
  "Infinity_{}": false,
  "Infinity_[[]]": false,
  "Infinity_[0]": false,
  "Infinity_[1]": false,
  "Infinity_NaN": false,
  "-Infinity_true": false,
  "-Infinity_false": false,
  "-Infinity_1": false,
  "-Infinity_0": false,
  "-Infinity_-1": false,
  "-Infinity_\"true\"": false,
  "-Infinity_\"false\"": false,
  "-Infinity_\"1\"": false,
  "-Infinity_\"0\"": false,
  "-Infinity_\"-1\"": false,
  "-Infinity_\"\"": false,
  "-Infinity_null": false,
  "-Infinity_undefined": false,
  "-Infinity_Infinity": false,
  "-Infinity_-Infinity": true,
  "-Infinity_[]": false,
  "-Infinity_{}": false,
  "-Infinity_[[]]": false,
  "-Infinity_[0]": false,
  "-Infinity_[1]": false,
  "-Infinity_NaN": false,
  "[]_true": false,
  "[]_false": true,
  "[]_1": false,
  "[]_0": true,
  "[]_-1": false,
  "[]_\"true\"": false,
  "[]_\"false\"": false,
  "[]_\"1\"": false,
  "[]_\"0\"": false,
  "[]_\"-1\"": false,
  "[]_\"\"": true,
  "[]_null": false,
  "[]_undefined": false,
  "[]_Infinity": false,
  "[]_-Infinity": false,
  "[]_[]": false,
  "[]_{}": false,
  "[]_[[]]": false,
  "[]_[0]": false,
  "[]_[1]": false,
  "[]_NaN": false,
  "{}_true": false,
  "{}_false": false,
  "{}_1": false,
  "{}_0": false,
  "{}_-1": false,
  "{}_\"true\"": false,
  "{}_\"false\"": false,
  "{}_\"1\"": false,
  "{}_\"0\"": false,
  "{}_\"-1\"": false,
  "{}_\"\"": false,
  "{}_null": false,
  "{}_undefined": false,
  "{}_Infinity": false,
  "{}_-Infinity": false,
  "{}_[]": false,
  "{}_{}": false,
  "{}_[[]]": false,
  "{}_[0]": false,
  "{}_[1]": false,
  "{}_NaN": false,
  "[[]]_true": false,
  "[[]]_false": true,
  "[[]]_1": false,
  "[[]]_0": true,
  "[[]]_-1": false,
  "[[]]_\"true\"": false,
  "[[]]_\"false\"": false,
  "[[]]_\"1\"": false,
  "[[]]_\"0\"": false,
  "[[]]_\"-1\"": false,
  "[[]]_\"\"": true,
  "[[]]_null": false,
  "[[]]_undefined": false,
  "[[]]_Infinity": false,
  "[[]]_-Infinity": false,
  "[[]]_[]": false,
  "[[]]_{}": false,
  "[[]]_[[]]": false,
  "[[]]_[0]": false,
  "[[]]_[1]": false,
  "[[]]_NaN": false,
  "[0]_true": false,
  "[0]_false": true,
  "[0]_1": false,
  "[0]_0": true,
  "[0]_-1": false,
  "[0]_\"true\"": false,
  "[0]_\"false\"": false,
  "[0]_\"1\"": false,
  "[0]_\"0\"": true,
  "[0]_\"-1\"": false,
  "[0]_\"\"": false,
  "[0]_null": false,
  "[0]_undefined": false,
  "[0]_Infinity": false,
  "[0]_-Infinity": false,
  "[0]_[]": false,
  "[0]_{}": false,
  "[0]_[[]]": false,
  "[0]_[0]": false,
  "[0]_[1]": false,
  "[0]_NaN": false,
  "[1]_true": true,
  "[1]_false": false,
  "[1]_1": true,
  "[1]_0": false,
  "[1]_-1": false,
  "[1]_\"true\"": false,
  "[1]_\"false\"": false,
  "[1]_\"1\"": true,
  "[1]_\"0\"": false,
  "[1]_\"-1\"": false,
  "[1]_\"\"": false,
  "[1]_null": false,
  "[1]_undefined": false,
  "[1]_Infinity": false,
  "[1]_-Infinity": false,
  "[1]_[]": false,
  "[1]_{}": false,
  "[1]_[[]]": false,
  "[1]_[0]": false,
  "[1]_[1]": false,
  "[1]_NaN": false,
  "NaN_true": false,
  "NaN_false": false,
  "NaN_1": false,
  "NaN_0": false,
  "NaN_-1": false,
  "NaN_\"true\"": false,
  "NaN_\"false\"": false,
  "NaN_\"1\"": false,
  "NaN_\"0\"": false,
  "NaN_\"-1\"": false,
  "NaN_\"\"": false,
  "NaN_null": false,
  "NaN_undefined": false,
  "NaN_Infinity": false,
  "NaN_-Infinity": false,
  "NaN_[]": false,
  "NaN_{}": false,
  "NaN_[[]]": false,
  "NaN_[0]": false,
  "NaN_[1]": false,
  "NaN_NaN": false
};
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
function compare(lol){
  // YOUR CODE HERE
  var twoD = [];
  var array = valuesToCheck();
  for (var i = 0; i < array.length; i++){
    for (var j = 0; j < array.length; j++){
      var temp = [];
      if (Array.isArray(array[i]))
        temp.push(array[i].slice());
      else if (_.isEqual(array[i], {}))
        temp.push({});
      else
        temp.push(array[i]);
      if (_.isEqual(array[j], []))
        temp.push(array[j].slice());
      else if (_.isEqual(array[j], {}))
        temp.push({});
      else
        temp.push(array[j]);
      twoD.push(temp);
    }
  }


  var obj = {};

  for (var i = 0; i < twoD.length; i++){
    var s = '';
    if (typeof twoD[i][0] === "string"){
      s += "\"" + twoD[i][0] + "\"";
    }
    else if (_.isEqual(twoD[i][0], [])){
      s += "[]"
    }
    else if (_.isEqual(twoD[i][0], [[]])){
      s += "[[]]"
    }
    else if (_.isEqual(twoD[i][0], [0])){
      s += "[0]"
    }
    else if (_.isEqual(twoD[i][0], [1])){
      s += "[1]"
    }
    else if (_.isEqual(twoD[i][0], {})){
      s += "{}"
    }
    else
    s += String(twoD[i][0]);
  s += '_'
  if (typeof twoD[i][1] === "string"){
      s += "\"" + twoD[i][1] + "\"";
    }
    else if (_.isEqual(twoD[i][1], [])){
      s += "[]"
    }
    else if (_.isEqual(twoD[i][1], [[]])){
      s += "[[]]"
    }
    else if (_.isEqual(twoD[i][1], [0])){
      s += "[0]"
    }
    else if (_.isEqual(twoD[i][1], [1])){
      s += "[1]"
    }
    else if (_.isEqual(twoD[i][1], {})){
      s += "{}"
    }
    else
       s += twoD[i][1];
    if (lol === '==')
      obj[s] = twoD[i][0] == twoD[i][1];
    else {
      obj[s] = twoD[i][0] === twoD[i][1];
    }
  }

  return obj;
}

function findDiffInObj(obj1, obj2){
  var returnArray = [];
  for(var key in obj1){
    var wrongKeyVal1 = {};
    var wrongKeyVal2 = {};
    if(obj1[key] !== obj2[key]){
      wrongKeyVal1[key] = obj1[key];
      wrongKeyVal2[key] = obj2[key];
      returnArray.push([wrongKeyVal1, wrongKeyVal2]);
    }
  }
  return returnArray;
}
comp.testLooseEquality = function() {
    // YOUR CODE HERE
    console.log(findDiffInObj(compare('=='), ans));
    return compare('==');
};

comp.testStrictEquality = function() {
    // YOUR CODE HERE
    return compare('===');
};
