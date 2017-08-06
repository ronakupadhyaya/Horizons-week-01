"use strict";

window.grades = {};

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
grades.average = function(arr) {
  // YOUR CODE HERE
  var divisor = arr.length;
  if(divisor === 0){
    return 0;
  }

  var newArr = _.reduce(arr, function(a,b){
    return a + b;
  });

  return (newArr/divisor);
};

// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes an Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA() -> 1.5
// ex. grades.getGPA([0, 0]) -> 0
//
// hint. use grades.average
grades.getGPA = function(student) {
  // YOUR CODE HERE
  var array = [];
  _.forEach(student.grades, function(value, key){
    array.push(value);
  })
  return grades.average(array);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE

  var object = _.mapObject(data, function(student, key){

     return grades.getGPA(student);
  })
  //console.log(data);
  //console.log(object);

var high = 0
var keyValue =0;

_.forEach(object, function(value, key){
    if(object[key] > high){
      high = object[key];
      keyValue = key;
    }
  })

  return data[keyValue];
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var groupedObject = _.groupBy(data, function(student){
    return student.major;
  })
  //console.log(groupedObject);

var finalObj = {};
var arrayOfAvgGPAs = [];

_.forEach(groupedObject, function(value, key){
   // console.log(key);
    var modifiedArrayOfGPAs = _.map(value, grades.getGPA);
    // console.log(modifiedArrayOfGPAs);
    var averageGPA = grades.average(modifiedArrayOfGPAs);
    //console.log(averageGPA);
    arrayOfAvgGPAs.push(averageGPA);
    finalObj[key] = averageGPA;
    //console.log(finalObj);

  })

var high = 0;
var highKey;
  _.forEach(finalObj, function(value,key){
    if(value > high){
      high = value;
      highKey = key;
    }
  })
return highKey;

}
// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var classOne = [];
  var classTwo = [];
  _.forEach(data, function(value, key){
    var grade = value.grades;
    classOne.push(grade.class1);
    classTwo.push(grade.class2);
  })

  var class1avg = grades.average(classOne);
  var class2avg = grades.average(classTwo);
  var finalObj = {
    class1: class1avg,
    class2: class2avg
  };
  return finalObj;
};
