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
  return _.reduce(arr, function (a, b) {
    return a+b;
  }, 0) / (arr.length === 0 ? 1 : arr.length);
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
  var arr = [];
  _.forEach(student.grades, function(value, key){
    arr.push(value);
  });
  return grades.average(arr);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  return data.reduce(function (highestStudent, currentStudent) {
    return grades.getGPA(highestStudent) > grades.getGPA(currentStudent) ? highestStudent : currentStudent;
  });
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var group = _.groupBy(data, function(student) {
    return student.major;
  });
  //go through each major, calculate gpa, store highest average 
  var highestAverage = 0;
  var major = null;
  _.forEach(group, function(val, key) {
    //val is student array, key is major
    //go through student array and create array of average grades per student
    var studAverages = [];
    val.forEach(function (student) {
      var individGrades = [student.grades.class1, student.grades.class2];
      studAverages.push(grades.average(individGrades));
    });
    //replace val stud array with val avg major gpas
    val = grades.average(studAverages);
    //check if avg gpa is highest so far, replace values if so
    if (val > highestAverage) {
      highestAverage = val;
      major = key;
    }
  });
  return major;
};


// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys,
// `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var class1grades = [];
  data.forEach(function (student) {
    class1grades.push(student.grades.class1);
  });
  var class2grades = [];
  data.forEach(function (student) {
    class2grades.push(student.grades.class2);
  });

  var class1avg = grades.average(class1grades);
  var class2avg = grades.average(class2grades);

  return { class1: class1avg, class2: class2avg};

};
