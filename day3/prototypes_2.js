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


Array.prototype.hasEqualContent = function(array2) {
  if(this.length === array2.length) {
    this.sort();
    array2.sort();
    if (array2.length===0 && this.length === 0) {
      return true;
    }
    for (var i = 0; i < array2.length; i++) {
      if(this[i] === array2[i]) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  } else {
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


  var pairsThis = _.pairs(this)
  var pairsObj2 = _.pairs(object2)
  if(pairsThis.length !== pairsObj2.length){
    return false
  }
  console.log("run", pairsObj2.length, this);
  for (var i = 0; i < pairsObj2.length - 1; i++) {

    if(!_.any(pairsObj2, function(entry) {
      console.log("word", entry, pairsThis[i], entry.hasEqualContent(pairsThis[i]));

      return  entry.hasEqualContent(pairsThis[i])

    } ))  {
      return false
    }

  }


  return true
}

// [ [a,1], [b,2]]
// [ [b,2], [a,]]






//
