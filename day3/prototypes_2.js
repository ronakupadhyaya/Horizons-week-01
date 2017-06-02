"use strict";

window.prototypes = {};

// Part 3. Adding methods to collections

// You are going to implement a function that compares if two arrays have the same
// things, without necessarily having the same order.

// [3, 2, 1].hasEqualContent([1, 2, 3] -> true
// [1, 2, 3].hasEqualContent([1, 2, 3]) -> true
// [].hasEqualContent([]) -> true]
// [1, 3, 4].hasEqualContent([1, 3, 4, 5] -> false
// [1, 2, 4].hasEqualContent([1, 3, 4]) -> false

// Hint: the first thing you have to figure out is how to get the first array
// inside the function. Then you can compare it to array2.

Array.prototype.hasEqualContent = function(array2){
 // YOUR CODE HERE
  //  debugger;
  //sort array
  this.sort();
  array2.sort();

//  debugger;
  if (this.length !== array2.length) {
    return false;
  }
  if (this.length === array2.length) {
    if (this[0] === array2[0] && this[1] === array2[1] && this[2] === array2[2]) {
      return true;
    }
    if (this.length === 0 && array2.length === 0) {
      return true;
    } else {
      return false;
    }

  }



}

// You are going to implement a function that compares if two Objects have the same
// key-value pairs.

// {a:1, b:2, c:3}.hasEqualContent({a:1, b:2, c:3} -> true)
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3, b:2}) -> [] true
// {}.hasEqualContent({}) -> true"
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3}) -> [] false
// {a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3}) -> [] false

// Hint: use the Array.prototype.hasEqualContent to compare the content of an object,
// without having to account for the order of elements.

Object.prototype.hasEqualContent = function(object2){
 // YOUR CODE HERE
  // debugger;
  var object1 = {};
  object1 = this;
  var keys1 = _.keys(object1);
  var keys2 = _.keys(object2);
  var values1 = _.values(object1);
  var values2 = _.values(object2);



  if (!keys1.hasEqualContent(keys2) ||  !values1.hasEqualContent(values2)) {
    return false;
  }

  for (var i = 0; i < values1.length; i++) {
    if (object1[keys1[i]] !== object2[keys1[i]]) {
      return false;
    }
  }
  return true;

}
