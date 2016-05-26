"use strict";

window.grades = {};

// In this exercise, you will be implementing functions that will help in analyzing a class (such as yourself). We have provided you with an example dataset under `data/grades.js` that you can peruse by yourself as you wish.

// Data Format:
// The data that will be run through each program is an array of studen objects (<Student[]>)
// The student object is comprised of these keys:
// 'name', a string for the student's first name (warning - not unique!)
// 'major', a string indicating the user's major (there are only 4 majors)
// 'grades', an object with two keys, 'class1' and 'class2', whose values are integers from 1 to 4 indicating that students performance in the class.

// [Helper] Exercise 0. grades.average(arr<Number[]>)
// Write a function that takes an array of numbers and returns the sum of all of them.
//
// hint. use _.fold()
grades.average = function(arr) {
  // YOUR CODE HERE
  // not using _.fold()
  if (arr.length == 0) {
    return 0;
  }
  return (arr.reduce(function(prev, curr) {
    return prev + curr;
  }, 0) / arr.length);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that returns the student with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var highest = 0;
  var best = '';
  data.forEach(function(student) {
    // calculate gpa
    var gpa = (student.grades["class1"] + student.grades["class2"]) / 2;
    if (highest < gpa) {
      highest = gpa;
      best = student.name;
    }
    
  });
  return best;
}

grades.highestGPAForMajor = function(data) {
  // YOUR CODE HERE
  dat
};

grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  return ' ';
};

grades.avgGPA = function(data) {
  // YOUR CODE HERE
  return 0;
};

grades.avgGPAForClass = function(data) {
  // YOUR CODE HERE
  return 0;
};
