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

  var array = this
  var comparr1 = array.sort();
  var comparr2 = array2.sort();
  console.log(comparr2, comparr1)
  if( comparr1.length !== comparr2.length){
    return false;
  }
  if(comparr1.length === 0 && comparr2.length === 0){
    return true;
  }
  var bool = false
  for(var i =0; i< comparr1.length; i++){

    if(comparr1[i] === comparr2[i]){
      bool = true;
    }

    else{
      return false
    }
  }
  return bool
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
 // // YOUR CODE HERE
 // var obj = _.pairs(this)
 // var objarr2 = _.pairs(object2)
 // var objarr1 = obj.sort();
 // var objarr2 = objarr2.sort();
 // console.log(objarr2, objarr1)
 var thisArray = _.pairs(this);
   var object2Array = _.pairs(object2);
   thisArray.sort(function(a,b){
     return a[1]-b[1];
   });
   object2Array.sort(function(a,b){
     return a[1] - b[1];
   });
   if(thisArray.length !== object2Array.length){
     return false
   }
for(var i =0; i<thisArray.length; i++ ){
  if(thisArray[i][0] !== object2Array[i][0]){
    return false
  }
}
return true
};

 // if( objarr1.length !== objarr2.length){
 //   return false;
 // }
 // if(objarr1.length === 0 && objarr2.length === 0){
 //   return true;
 // }
 // var bool = false
 // for(var i =0; i< objarr1.length; i++){
 //
 //   if(objarr1[i] === objarr2[i]){
 //     bool = true;
 //   }
 //
 //   else{
 //     return false
 //   }
 // }
 // return bool
