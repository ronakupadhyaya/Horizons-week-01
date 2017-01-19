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
  this.sort();
  array2.sort();
  var array1 = this;
  if (array1.length === array2.length) {
    if (this.length === 0) {
      return true;
    } else {
      debugger;
      for (var i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
          return false;
        }
      }
      return true;
    }
  } else {
    return false;
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

Object.prototype.hasEqualContent = function(array2){
 // YOUR CODE HERE
  // var thisKeys = Object.keys(this);
  // var thisValues = Object.values(this);
  // var arrayKeys = Object.keys(array2);
  // var arrayValues = Object.values(array2);
  //
  // if (thisKeys.length === arrayKeys.length && thisValues.length === arrayValues.length) {
  //
  // }
  if(_.isEqual(this, array2)) {
    return true;
  } else {
    return false;
  }
}
