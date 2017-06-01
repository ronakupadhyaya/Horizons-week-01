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
  var counter=0;
    for (var i=0; i<this.length;i++){
      for (var j=0; j<array2.length;j++){
        if (this[i]===array2[j]){
          counter++
        }
      }
    }
    if (counter==array2.length){
      return true
    }
    return false
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

  // console.log(object2.length)
  var counter = 0
  for(var keys1 in this) {
    for(var keys2 in object2){
    if (keys1===keys2){
      if(this[keys1] === object2[keys2] && this.hasOwnProperty(keys1) && object2.hasOwnProperty(keys2)) {
        counter++;
        console.log(keys1,keys2)
      }
    }
    }

  }

  if(counter === Object.keys(this).length&& Object.keys(this).length===Object.keys(object2).length){
    return true;
  }
  return false;

}
