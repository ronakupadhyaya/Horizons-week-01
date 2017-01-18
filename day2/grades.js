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
  var sum = _.reduce(arr, function(a, b) {
    return a + b;
  });
  var avg = sum / arr.length;
  return avg;
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
  var grade1 = student.grades["class1"];
  var grade2 = student.grades["class2"];
  var gpa = (grade1 + grade2)/2;
  return gpa;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  data.sort(function(a, b) {
    return (b.grades.class1 + b.grades.class2)/2 - (a.grades.class1 + a.grades.class2)/2;
  })
  return data[0];
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
//   var majorGroups = _.groupBy(data, function (a) {
//     return a.major;
//   });
//   _.forEach(majorGroups, function (a) {
//     var groupGpa = 0;
//     for (var i = 0; i < majorGroups.length; i++) {
//       var groupGpa += ((majorGroups[i].class1 + majorGroups[i].class2)/2)
//     }
//   })
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var averages = {};
  averages.class1 = 0, averages.class2 = 0;
  _.forEach(data, function (a) {
    averages.class1 += a.grades.class1;
    averages.class2 += a.grades.class2;
  });
  averages.class1 = averages.class1 / data.length;
  averages.class2 = averages.class2 / data.length;
  return averages;
};
