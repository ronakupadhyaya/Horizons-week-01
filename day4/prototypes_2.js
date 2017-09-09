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
  var len1 = this.length;
  var len2 = array2.length;
  if(len1!==len2){
    return false;
  }
  for(var i = 0; i<len1; i++){
    var index = array2.indexOf(this[i]);
    if(index<0){
      return false;
    }
    array2.splice(index,1);
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
  var keys1 = Object.keys(this);
  var keys2 = Object.keys(object2);
  if(keys1.length!==keys2.length){
    return false;
  }
  for(var key in this){
    debugger;
    if(keys1.indexOf(key)>=0){
      if(!object2.hasOwnProperty(key)){
        return false;
      }
      if(this[key] !== object2[key]){
        return false;
      }
    }
  }
  return true;
}
