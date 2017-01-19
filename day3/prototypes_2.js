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
  for(var i=0;i< this.length; i++){
    var allExist = false;
    for(var j=0;j<array2.length;j++){
      if(this[i] === array2[j]) allExist =  true;
    }
    if(!allExist) return false;
  }
  for(var i=0;i< array2.length; i++){
    var allExist = false;
    for(var j=0;j<this.length;j++){
      if(this[i] === array2[j]) allExist =  true;
    }
    if(!allExist) return false;
  }
  return true;
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
  var key1 = Object.keys(this);
  var key2 = Object.keys(array2);
  var value1 = Object.values(this);
  var value2 = Object.values(array2);
  if (!key1.hasEqualContent(key2) || !value1.hasEqualContent(value2)){
    return false;
  }
  for (var i = 0; i<value1.length; i++){
    if(this[key2[i]]!==array2[key2[i]]){
      return false;
    }
  }
  return true;
}
