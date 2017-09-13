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
  var checkCount = 0;
  if(this.length !== array2.length){
    return false;
  }
  _.forEach(this, function(value1, index1, array1){
    if(array2.indexOf(value1) === -1){
      checkCount++;
    }
  })
  if(checkCount === 0){
    return true;
  }
  return false;
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
Object.prototype.keys = function(){
  // YOUR CODE HERE
  var returnArray = [];
  for(var key in this){
    if(this.hasOwnProperty(key)){
      returnArray.push(key);
    }
  }

  return returnArray;
}

Object.prototype.hasEqualContent = function(object2){
 // YOUR CODE HERE

 var firstArray = this.keys(this);
 var secondArray = object2.keys();
 var keyMatch = firstArray.hasEqualContent(secondArray);

 var valueMatch = function(object1, object2){
   var checkCounter = 0;
   for(var key in object1){
     if(object2[key] !== object1[key]){
       checkCounter++;
     }
   }
   return checkCounter===0;
 }
 return keyMatch && valueMatch(this, object2);
}
