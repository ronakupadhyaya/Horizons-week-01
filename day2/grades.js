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


// grades.average = function(arr) {
// if(arr !== []) {
//   var sum = 0;
//   for (var i = 0; i < arr.length; i++){
//     sum += arr[i];
//   }
// return (sum/arr.length);
// }
// else {
//   return 0;
// };

grades.average = function(arr) {
if (arr.length === 0){
  return 0;
}
var sum = arr.reduce(function(a,b){
  return a + b; }, 0);
var av = sum/(arr.length);
return av;
};

//here we used the reduce function :)

// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes an Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA() -> 1.5
// ex. grades.getGPA([0, 0]) -> 0
//
// hint. use grades.average
grades.getGPA = function(student) {
  var gpa = grades.average([student.grades.class1, student.grades.class2]);
  return gpa;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
// what do we want? We
grades.highestGPA = function(data) {
  var highest = 0
  var apple;
  for (var i = 0; i < data.length; i++) {
    if (grades.getGPA(data[i]) > highest) {
      highest = grades.getGPA(data[i])
      apple = data[i];
    }
  }
  return apple;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var studentsGroupByMajor {}; //groups their majors
  var students = data[i]
    for (var i =0; i < data.length; i++) {
      studentsGroupByMajor[student.major] = [];
      studentsGroupByMajor[student.major].push(grades.getGPA(students));
    }
    
};
// we want to group all the GPAs by majors and then find the average GPA of each major


// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
};
