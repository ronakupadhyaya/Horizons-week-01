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
  function sum (x, y) {
    return x + y
  }
  if(arr.length === 0) return 0
  return _.reduce(arr, sum) / arr.length
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
  var arr = [];
  var class1 = student.grades['class1'];
  var class2 = student.grades['class2'];
  arr.push(class1);
  arr.push(class2);
  return grades.average(arr);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var grades1 = [];
  for (var i = 0; i < data.length; i++) {
    var gpa = grades.getGPA(data[i]);
    grades1.push(gpa)
  }
  var indexGpa = grades1.indexOf(Math.max.apply(null, grades1))

  return data[indexGpa]
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var sortedData =_.groupBy(data, function(student) {
    return student.major;
  });
  var gpaObject = {};
  var majors = Object.keys(sortedData)
  var majorGpa = []
  for (var i = 0; i < majors.length; i++){
    var Sgpa = []
    for(var x = 0; x < sortedData[majors[i]].length; x++) {
      var studentName = sortedData[majors[i]][x];
      Sgpa.push(grades.getGPA(studentName))
    }
    majorGpa.push(grades.average(Sgpa));
  }
  var indexGpa = majorGpa.indexOf(Math.max.apply(null, majorGpa))
  return majors[indexGpa];
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var class1 =[]
  var class2 = []
  var final = {}
  for (var i = 0; i < data.length; i++) {
    class1.push(data[i].grades['class1']);
    class2.push(data[i].grades['class2']);
  }
  final['class1'] = grades.average(class1);
  final['class2'] = grades.average(class2);
  return final
};
