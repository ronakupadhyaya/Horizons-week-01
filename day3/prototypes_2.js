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
 // Try to redo with nested arrays
  var isEqual = true;
  if(array2.length === this.length){
    this.forEach(function(item){
      if(array2.indexOf(item)===-1){
        isEqual = false;
      }
    });
  }else {
    isEqual = false;
  }

  return isEqual;

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
 // Try to implement with nested objects
  var isEqual = true;
  var obj1 = this;
  if(Object.keys(object2).length === Object.keys(obj1).length){
    _.forEach(object2, function(value,key){
      if(obj1.hasOwnProperty(key)){
        console.log("match");
        if(obj1[key] !== value){
          isEqual = false;
        }
      } else {
        isEqual = false;
      }
    })
  } else {
    isEqual = false;
  }
  return isEqual;

}
