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
  if (this.length !== array2.length){
    return false;
  }
  var arr1 = this.sort();
  console.log(arr1)
  var arr2 = array2.sort();
  console.log(arr2)
  var b = true;
  for (var i = 0; i < arr1.length; i++){
    if (arr1[i] !== arr2[i]){
      b = false;
    }
  }
  return b;
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
 // YOUR CODE HERE
  var arr1 = Object.entries(this);
  var arr2 = Object.entries(object2);

  if (arr1.length !== arr2.length){
    return false;
  }
  if (arr1.length === 0 && arr2.length ===0){
    return true;
  }

  var b = true;
  for(var i = 0; i < arr1.length; i++){
    if (arr1[i][0]!== arr2[i][0]){
      b = false;
    } else if((arr1[i][1]!== arr2[i][1])){
      b = false;
    }
    return b;
  }


  /*var keys1 = Object.keys(this);
  var keys2 = Object.keys(object2);

  var val1 = Object.values(this);
  var val2 = Object.values(object2);

  if (keys1.length !== keys2.length){
    return false;
  }
  var arr1 = keys1.sort();
  var arr2 = keys2.sort();

  var b = true;
  for (var i = 0; i < arr1.length; i++){
    if (arr1[i] !== arr2[i]){
      b = false;
    }
  }

  var arr3 = val1.sort();
  var arr4 = val2.sort();
  var a = true;
  for (var i = 0; i < arr3.length; i++){
    if (arr3[i] !== arr4[i]){
      a = false;
    }
  }

  return b && a;*/
}
