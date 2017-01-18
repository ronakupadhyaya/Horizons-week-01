"use strict";

window.prototypes = {};

// Part 3. Adding methods to collections

//the fisrt thing you have to figure out is what is array 1 inside if the function.
Array.prototype.hasEqualContent = function(array2){
  // We want our is equal function to compare that 2 arrays contain the same things,
  // without necessarily having the same order.
  if(this.length !== array2.length){
    return false;
  }
  this.sort()
  array2.sort()
  for(var i=0; i<this.length; i++){
    if(this[i]!==array2[i]){
      return false
    }
  }
  return true;
}

//Bonus.
// use keys from above
// same #of keys
// sort.
// check same keys+values.
// Test for supersets + keys in different order.
//remember that the valeues must be on the same keys sob{a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3}) is invalid
Object.prototype.hasEqualContent = function(array2){
  var keys1 = Object.keys(this)
  var keys2 = Object.keys(array2)
  var values1 = Object.values(this)
  var values2 = Object.values(array2)

if (!keys1.hasEqualContent(keys2) || !values1.hasEqualContent(values2)){
  return false
}
console.log(values1)
  for (var i = 0; i<values1.length; i++){
    if(this[keys2[i]]!==array2[keys2[i]]){
      console.log(values1[i])
      return false
    }
  }
  return true
}
