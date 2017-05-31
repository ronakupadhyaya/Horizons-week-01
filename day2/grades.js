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
  if (arr.length === 0) {
    return 0;
  }
  var sum = _.reduce(arr, function(a, b) {return a + b}, 0);
  return sum / arr.length;
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
  var gpa = student.grades;
  var arr = [];
  _.forEach(gpa, function(val, key) {
    arr.push(val);
  })
  // console.log(arr);
  return grades.average(arr);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
//   var arr1 = [];
//   var arr1 = _.forEach(data, function(student) {
//     var obj = {}
//     obj[student] = grades.getGPA(student);
//     arr1.push(obj);
//     console.log(arr1);
//   })
//
//   return _.max(arr1, function(arr1) {
//     var variable;
//     for (var key in arr1) {
//       if (object.hasOwnProperty(key)) {
//         varriable = key;
//   }
// }
//   });
  function fun1(student) {
    var gpa = grades.getGPA(student);
    return gpa;
    // console.log(gpa)
  }
  return _.max(data, fun1);
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var highestGPA = 0;
  var highestMajor = "";
  var temp = _.groupBy(data, "major");

  function fun(val, key){
    val = val.map(function(student){
      return grades.getGPA(student);
    })
    // console.log(val);
    if (grades.average(val) > highestGPA){
      highestGPA = grades.average(val);
      highestMajor = key;
    }
    return grades.average(val);
  }
  var temp1 = _.mapObject(temp, fun);

  return highestMajor;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var class1GPA = 0, class2GPA = 0;
  for (var i = 0; i < data.length; i++) {
    class1GPA += data[i].grades.class1;
  }
  for (var i = 0; i < data.length; i++) {
    class2GPA += data[i].grades.class2;
  }
  return {'class1': class1GPA/data.length, 'class2': class2GPA/data.length};



};
