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
  if (arr.length === 0) {
    return 0;
  }
  var temp1 = _.reduce(arr, function(a, b) {
    return a + b
  })
  return temp1 / arr.length;
  // YOUR CODE HERE
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
  var empty1 = student.grades.class1;
  var empty2 = student.grades.class2;
  return (empty1 + empty2) /2
  // YOUR CODE HERE

};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var highestGPA = grades.getGPA(data[0]);

  for (var i = 1; i < data.length; i++) {
    if (grades.getGPA(data[i]) > highestGPA) {
      highestGPA = grades.getGPA(data[i])
      var d = data[i]
    }
  }
  return d;
  // YOUR CODE HERE
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the
// highest average GPA.
//
// Group students by major, calculate their GPAs, then find the average GPA for students
// with a given major.
//
// For example, if all the students that have the "Economics" major
// average their GPA's together and get 3.4 and all other majors' averages are less than that,
// then "Economics" would be the return value.
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {


var simple1 = _.groupBy(data, function(student) {
  return student.major
});
console.log("This is simple1", simple1)

function lovely (studentarray) {
  var what = _.map(studentarray, grades.getGPA);
  return _.map(studentarray, grades.getGPA);
}

var simple2 = _.mapObject(simple1, function(val, key) {
  return lovely(val);
})
console.log("This is simple2", simple2)
var simple3 = _.mapObject(simple2, grades.average)
console.log("This is simple3", simple3)
var major = "";
var gpa = 0;
for (var property in simple3) {
  if (gpa < simple3[property]) {
    gpa = simple3[property];
    major = property
  }
}
return major;

};

  // YOUR CODE HERE

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var c1 = 0;
  var c2 = 0;

  _.forEach(data, function(student) {
    c1 += student.grades.class1;
    console.log(c1);
    c2 += student.grades.class2;
  });


  c1 = c1 / data.length;
  c2 = c2 / data.length;
console.log(c1, c2);
  return { "class1" : c1, "class2" : c2 };
};
