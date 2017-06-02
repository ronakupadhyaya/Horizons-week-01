"use strict";

window.prototypes = {};

// Part 3. Adding methods to collections

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
  if(this.length === array2.length){
    for (var i=0; i<array2.length;i++){
      if(!this.includes(array2[i])){
        return false;
      }
    }
    return true;
  }else {
    return false;
  }
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
  var stringTogether = function(array){
    return array.toString();
  }
  var firstObject= _.map(_.pairs(this),stringTogether)
  var secondObject= _.map(_.pairs(object2),stringTogether)


  if(firstObject.length === secondObject.length){
    for (var i=0; i<secondObject.length;i++){
      if(!firstObject.includes(secondObject[i])){
        return false;
      }
    }
    return true;
  }else {
    return false;
  }
}
