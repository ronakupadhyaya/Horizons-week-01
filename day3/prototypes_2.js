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

// Hint: the fisrt thing you have to figure out is how to get the first array
// inside the function. Then you can compare it to array2.

Array.prototype.hasEqualContent = function(array2){
  // YOUR CODE HERE
  var checked = 0;
  this.forEach(function(element) {
    if (array2.indexOf(element) > -1) {
      checked++;
    }
  })
  if (this.length === array2.length) {
    if (this.length === 0) {
      return true;
    } else if (this.length === checked) {
      return true;
    }
  }
  return false;
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

Object.prototype.hasEqualContent = function(obj2){
  var keys1 = Object.keys(this);
  var keys2 = Object.keys(obj2);
  var vals1 = Object.values(this);
  var vals2 = Object.values(obj2);
  // console.log("keys1",keys1);
  // console.log("keys2",keys2);
  if (!keys1.hasEqualContent(keys2) || !vals1.hasEqualContent(vals2)) {
    return false;
  }
  for (var i=0; i<keys1.length; i++) {
    if (this[keys1[i]] !== obj2[keys1[i]]) {
      return false;
    }
  }
  return true;
}
