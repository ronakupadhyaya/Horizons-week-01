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
 // YOUR CODE HERE
  var array1=this;
  console.log(_.difference(array2, array1));

  if(array2.length>array1.length){
    return _.difference(array2, array1).length===0 ? true : false;
  } else{
    return _.difference(array1, array2).length===0 ? true : false;
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
 // YOUR CODE HERE
  var object1=this;
  var arr1=[];
  var arr2=[];
  // console.log(arr1);

  //when you do for in there's a prototype chain and it goes all the way up that
  //and grabs the method you added


  // for (var key in object1){
  //   console.log(key, object1[key]);
  //   arr1.push([key, object1[key]])
  // }
  // for (var key in object2){
  //   arr2.push([key, object2[key]])
  // }
  // console.log(arr1, arr2);
  // return arr1.hasEqualContent(arr2);
  var arr1keys=Object.keys(object1);
  var arr2keys=Object.keys(object2);
  if(arr1keys.length!==arr2keys.length){
    return false;
  } else{
    for(var i=0; i<arr1keys.length; i++){

      if(object1[arr1keys[i]]!==object2[arr1keys[i]]){
        return false
      }
    }
    return true;
  }

  //
  // for(var i=0; i<Object.keys(object1).length; i++){
  //   arr1.push([arr1keys[i], object1[arr1keys[i]]]);
  // }
  //
  // for(var i=0; i<Object.keys(object2).length; i++){
  //   arr2.push([arr2keys[i], object2[arr2keys[i]]])
  // }
  // console.log(arr1);
  // console.log(arr2);
  // return arr1.hasEqualContent(arr2);
}
