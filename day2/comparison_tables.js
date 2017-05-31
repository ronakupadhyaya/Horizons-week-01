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

// comp.truthSeeker = function(value) {
// 	if (value) {
// 		return true
// 	}
// 	else {
// 		return false
// 	}
// }

comp.testLooseEquality = function() {
  var myObj = {}
  var values = valuesToCheck();
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values.length; j++) {
      // console.log("i", values[i]);
      // console.log("j", values[j]);
      if (typeof(values[i]) === 'string') {
        var first = '\"' + values[i] + '\"' 
      } else if (values[i] instanceof Object) {
        var temp = values[i];
        first = JSON.stringify(values[i]);
        values[i] = temp;
      } else {
        first = values[i]
      }
      if (typeof(values[j]) === 'string') {
        var second = '\"' + values[j] + '\"' 
      } else if (values[j] instanceof Object) {
        var temp = values[j];
        second = JSON.stringify(values[j])
        values[j] = temp;
      } else {
        second = values[j];
      }
      if (values[i] instanceof Object && values[j] instanceof Object) {
        myObj[first + "_" + second] = false;
      } else {
        if (values[i] == values[j]) {
          myObj[first + "_" + second] = true;
        } else {
          myObj[first + "_" + second] = false;
        }
      }
    }
  }
  //console.log(myObj);
  return myObj;
};




    // var perm = []
    // var values = valuesToCheck()
    // for (var i = 0; i < valuesToCheck().length; i++) {
    // 	for (var j = 0; j < valuesToCheck().length; j++) {

    // 		perm.push([valuesToCheck()[i], valuesToCheck()[j]])
    // 	}
    // }
    // //console.log(perm)
    // var final = {}
    // var temp = true
    // var temp1
    // var temp2
    // for (var k = 0; k < perm.length; k++) {
    // 	if (typeof perm[k][0] === "string") {
    // 		temp1 = '"' + perm[k][0] + '"'
    // 	}
    // 	else if (Array.isArray(perm[k][0])) {
    // 		temp1 = '[]'
    // 		console.log(temp1)
    // 	}
    // 	else if (typeof perm[k][0] === 'object' && !perm[k][0]) {
    // 		temp1 = null
    // 	}
    // 	else if (typeof perm[k][0] === 'object') {
    // 		temp1 = '{}'
    // 	}
    // 	else {
    // 		temp1 = perm[k][0]
    // 	}
    // 	//repeat for temp2
    // 	if (typeof perm[k][1] === "string") {
    // 		temp2 = '"' + perm[k][1] + '"'
    // 	}
    // 	else if (Array.isArray(perm[k][1])) {
    // 		temp2 = '[]'
    // 	}
    // 	else if (typeof perm[k][1] === 'object' && !perm[k][1]) {
    // 		temp2 = null
    // 	}
    // 	else if (typeof perm[k][1] === 'object') {
    // 		temp2 = '{}'
    // 	}
    // 	else {
    // 		temp2 = perm[k][1]
    // 		console.log(temp2)
    // 	}
    // 	//Object.assign(final, { (temp1 + "_" + temp2) : (perm[k][0] == perm[k][1])})
    // 	final[temp1 + "_" + temp2] = (perm[k][0] == perm[k][1])
    // 	//console.log(temp1 + "_" + temp2)

    // 	//console.log(k, (perm[k][0] == perm[k][1]))
    // }

    // console.log(final)
    // return final

comp.testStrictEquality = function() {
      var myObj = {}
  var values = valuesToCheck();
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values.length; j++) {
      // console.log("i", values[i]);
      // console.log("j", values[j]);
      if (typeof(values[i]) === 'string') {
        var first = '\"' + values[i] + '\"' 
      } else if (values[i] instanceof Object) {
        var temp = values[i];
        first = JSON.stringify(values[i]);
        values[i] = temp;
      } else {
        first = values[i]
      }
      if (typeof(values[j]) === 'string') {
        var second = '\"' + values[j] + '\"' 
      } else if (values[j] instanceof Object) {
        var temp = values[j];
        second = JSON.stringify(values[j])
        values[j] = temp;
      } else {
        second = values[j];
      }
      if (values[i] instanceof Object && values[j] instanceof Object) {
        myObj[first + "_" + second] = false;
      } else {
        if (values[i] === values[j]) {
          myObj[first + "_" + second] = true;
        } else {
          myObj[first + "_" + second] = false;
        }
      }
    }
  }
  //console.log(myObj);
  return myObj;
};