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

comp.makePairs = function() {
	var values = valuesToCheck();
	var pairs = [];
	for (var i = 0; i < values.length; i++) {
		for (var j = 0; j < values.length; j++) {
			pairs.push([values[i], values[j]]);
		}
	}
	return pairs;
}

comp.testLooseEquality = function() {
	var values = valuesToCheck();
	var pairs = comp.makePairs();
	var result = {};	

	_.forEach(pairs, function(pair) {
		var key = pair[0] + "_" + pair[1];
		var first1 = false;
		var sec1 = false;
		var first2 = false;

		if (typeof pair[0] === "string") {
			key = "\"" + pair[0] + "\"_" + pair[1];
			first1 = true;
		}
		if (typeof pair[1] === "string") {
			if (first1) {
				key = "\"" + pair[0] + "\"_\"" + pair[1] + "\"";
			}
			else {
				key = pair[0] + "_\"" + pair[1] + "\"";
			}
			sec1 = true;
		}

		if (typeof pair[0] === 'object' && pair[0] !== null && pair[0] !== undefined) {
			if (key[0] !== '_') {
				if (sec1) {
					key = JSON.stringify(pair[0]) + "_\"" + pair[1] + "\"";
				}
				else {
					key = JSON.stringify(pair[0]) + "_" + pair[1];
				}
			}
			else {
				key = JSON.stringify(pair[0]) + key;
			}
			first2 = true;
		}
		if (typeof pair[1] === 'object' && pair[1] !== null && pair[1] !== undefined) {
			if (key[key.length - 1] !== '_') {
				if (first1) {
					key = "\"" + pair[0] + "\"_" + JSON.stringify(pair[1]);
				}
				else if (first2) {
					key = JSON.stringify(pair[0]) + "_" + JSON.stringify(pair[1]);
				}
				else {
					key = pair[0] + "_" + JSON.stringify(pair[1]);
				}
			}
			else {
				key = key + JSON.stringify(pair[1]);
			}
		}

		if (key[0] === '_') {
			console.log(key + " " + count);
		}
		result[key] = pair[0] == pair[1];
	})

	return result;
};

comp.testStrictEquality = function() {
	var values = valuesToCheck();
	var pairs = comp.makePairs();
	var result = {};

		_.forEach(pairs, function(pair) {
		var key = pair[0] + "_" + pair[1];
		var first1 = false;
		var sec1 = false;
		var first2 = false;

		if (typeof pair[0] === "string") {
			key = "\"" + pair[0] + "\"_" + pair[1];
			first1 = true;
		}
		if (typeof pair[1] === "string") {
			if (first1) {
				key = "\"" + pair[0] + "\"_\"" + pair[1] + "\"";
			}
			else {
				key = pair[0] + "_\"" + pair[1] + "\"";
			}
			sec1 = true;
		}

		if (typeof pair[0] === 'object' && pair[0] !== null && pair[0] !== undefined) {
			if (key[0] !== '_') {
				if (sec1) {
					key = JSON.stringify(pair[0]) + "_\"" + pair[1] + "\"";
				}
				else {
					key = JSON.stringify(pair[0]) + "_" + pair[1];
				}
			}
			else {
				key = JSON.stringify(pair[0]) + key;
			}
			first2 = true;
		}
		if (typeof pair[1] === 'object' && pair[1] !== null && pair[1] !== undefined) {
			if (key[key.length - 1] !== '_') {
				if (first1) {
					key = "\"" + pair[0] + "\"_" + JSON.stringify(pair[1]);
				}
				else if (first2) {
					key = JSON.stringify(pair[0]) + "_" + JSON.stringify(pair[1]);
				}
				else {
					key = pair[0] + "_" + JSON.stringify(pair[1]);
				}
			}
			else {
				key = key + JSON.stringify(pair[1]);
			}
		}

		if (key[0] === '_') {
			console.log(key + " " + count);
		}
		result[key] = pair[0] === pair[1];
	})

	return result;
};