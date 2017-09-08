"use strict";

window.prototypes = {};

// Part 2. Adding methods to collections

// You are going to implement a function that compares if two arrays have the same
// things, without necessarily having the same order.

// [3, 2, 1].hasEqualContent([1, 2, 3]) -> true
// [1, 2, 3].hasEqualContent([1, 2, 3]) -> true
// [].hasEqualContent([]) -> true
// [1, 3, 4].hasEqualContent([1, 3, 4, 5]) -> false
// [1, 2, 4].hasEqualContent([1, 3, 4]) -> false

// Hint: the first thing you have to figure out is how to get the first array
// inside the function. Then you can compare it to array2.

Array.prototype.hasEqualContent = function(array2){
 // YOUR CODE HERE
  if(this.length !== array2.length){
    return false;
  }
  this.sort();
  array2.sort();
  for(var i = 0; i < this.length; i++){
    if(this[i] !== array2[i]){
      return false;
    }
  }
  return true;
}

// You are going to implement a function that compares if two Objects have the same
// key-value pairs.

// {a:1, b:2, c:3}.hasEqualContent({a:1, b:2, c:3}) -> true
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3, b:2}) -> true
// {}.hasEqualContent({}) -> true
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3}) -> false
// {a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3}) -> false

// Hint: use the Array.prototype.hasEqualContent to compare the content of an object,
// without having to account for the order of elements.

Object.prototype.hasEqualContent = function(object2){
 // YOUR CODE HERE
  var thisKeyArray = Object.entries(this).sort();
  var obj2KeysArray = Object.entries(object2).sort();
  if(thisKeyArray.length !== obj2KeysArray.length){
    return false;
  }
  for(var i = 0; i < thisKeyArray.length; i++){
    if(!thisKeyArray[i].hasEqualContent(obj2KeysArray[i])){
      return false;
    }
  }
  return true;
}
