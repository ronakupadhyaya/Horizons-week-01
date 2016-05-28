"use strict";

window.grades = {};

// In this exercise, you will be implementing functions that will help in analyzing a class (such as yourself). We have provided you with an example dataset under `data/grades.js` that you can peruse by yourself as you wish.

// Data Format:
// The data that will be run through each program is an array of student objects (<Student[]>)
// The student object is comprised of these keys:
// 'name', a string for the student's first name (warning - not unique!)
// 'major', a string indicating the user's major (there are only 4 majors)
// 'grades', an object with two keys, 'class1' and 'class2', whose values are integers from 1 to 4 indicating that students performance in the class.

// [Helper] Exercise 0.A grades.average(arr<Number[]>)
// Write a function that takes an array of numbers and returns the average of all of them.
//
// ex. grades.average([0, 1, 2, 3]) -> 1.5
// ex. grades.average([1, 2, 4, 1]) -> 2
// ex. grades.average([]) -> 0
// ex. grades.average([0, 0]) -> 0
// 
// hint. use _.fold()
grades.average = function(arr) {
  // YOUR CODE HERE
  // not using _.fold()
  if (arr.length === 0) {
    return 0;
  }
  return (arr.reduce(function(prev, curr) {
    return prev + curr;
  }, 0) / arr.length);
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
  return grades.average([student.grades.class1, student.grades.class2]);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the name of the student with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var highest = 0;
  var best = '';
  data.forEach(function(student) {
    // calculate gpa
    var gpa = grades.getGPA(student);
    if (highest < gpa) {
      highest = gpa;
      best = student.name;
    }
    
  });
  return best;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major of the student with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var student = grades.highestGPA(data);
  student = data.filter(function(person) {
    return (person.name === student);
  })[0];
  return student.major;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var c1 = 0;
  var c2 = 0;
  
  data.forEach(function(student) {
    c1 += student.grades.class1;
    c2 += student.grades.class2;
  });
  
  c1 = c1 / data.length;
  c2 = c2 / data.length;
  
  return { "class1" : c1, "class2" : c2 };
};
