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
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the name of the student with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
}

// Exercise 2. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major of the student with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
};

// Exercise 2. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
// hint. you can use highestGPA if you'd like.
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
};
