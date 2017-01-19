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
  this.sort();
  array2.sort();
  var array1 = this;
  if(this.length === 0 && array2.length === 0){
    return true;
  }
  if(array1.length === array2.length){
    for(var i = 0; i < array1.length; i++){
      console.log(i);
      if(array1[i] !== array2[i]){
        console.log(array1[i]);
        console.log(array2[i]);
        return false;
      }
    }
    return true;
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

Object.prototype.hasEqualContent = function(array2){
  // var thisKeys = Object.keys(this);
  // var thisValues = Object.values(this);
  // var array2Keys = Object.keys(array2);
  // var array2Values = Object.keys(array2);
  //
  // thisKeys.sort();
  // thisValues.sort();
  // array2Keys.sort();
  // array2Values.sort();
  //
  // if(thisKeys.length === array2Keys.length && thisValues.length === array2Values.length ){
  //   for(var i = 0; i<thisKeys.length; i++){
  //     if(thisKeys[i] !== array2Keys[i] && thisValues[i] !== array2Values[i]){
  //       return false;
  //     }
  //   }
  //   return true;
  //
  // }
  // return false;
  if(_.isEqual(this, array2)){
    return true;
  }
  return false;
}
