"use strict";

window.prototypes = {};

// In this exercise, you will be implementing functions that will allow you to
// iterate through objects keys.

// MISSING DESCRIPTION


prototypes.allKeys = function(obj){
  var arr = [];
  for (var key in obj){
    arr.push(key)
  }
  return arr;
}

prototypes.keys = function(obj){
  var arr = [];
  for (var key in obj){
    if(obj.hasOwnProperty(key)){
      arr.push(key)
    }
  }
  return arr;
}



// STANDARD LIBRARY SECTION
//(Shallow Equals)
Array.prototype.isEqual = function(){

}

//Bonus.
Object.prototype.isEqual = function(){
  // same #of keys
  // sort.
  // check same keys+values.
  // Test for supersets + keys in different order.
}



// Quiz section.



//--------------------------------------------------------

// A student that completes this exercise should have:

// experienced property lookups going up one level on the prototype chain
// (obj1.prop1 doesnt exist as an 'own' property but does exist on a object up the prototype chain)
// [Using it. I setup the object.]
// [{} set with .prototype, object.create as alternative, commented]

// been introduced to Object.HasOwnProperty and reviewed Object.keys

// used a few methods on different prototypes (create an object and setup the prototype behind the scenes and/or find common
// use cases and explore them)
// .slice


// the ability to talk about the prototype chain and the difference between "own property" vs property received from the
// prototype chain




// FOR REFERENCE OF DESCRIPTIONS. NOT FROM THIS EX.
// DONT READ FROM HERE ON.

// In this exercise, you will be implementing functions that will help in
// analyzing a class of students.
// You can find the data under `data/grades.js`

// Data Format:
//
// The data that will be run through each program is an array of student objects.
// The student object is comprised of these keys:
//  - 'name', a string for the student's first name (warning - not unique!)
//  - 'major', a string indicating the user's major (there are only 4 majors)
//  - 'grades', an object with two keys, 'class1' and 'class2', whose values
//     are integers from 1 to 4 indicating that students performance in the
//     class.

// [Helper] Exercise 0.A grades.average(arr<Number[]>)
// Write a function that takes an array of numbers and returns the average of all of them.
//
// ex. grades.average([0, 1, 2, 3]) -> 1.5
// ex. grades.average([1, 2, 4, 1]) -> 2
// ex. grades.average([]) -> 0
// ex. grades.average([0, 0]) -> 0
//
// hint. use _.reduce()






//all keys, pairs
