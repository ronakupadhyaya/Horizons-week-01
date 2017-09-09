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
  if (arr.length === 0){
    return 0
  }
  var avNumber = _.reduce(arr, function(accumulator,num){
    return accumulator+num
  })
    var actualAv = avNumber / arr.length
    return actualAv
  }


// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes an Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA() -> 1.5
// ex. grades.getGPA([0, 0]) -> 0
//
// hint. use grades.average
grades.getGPA = function(student) {
  var gradesObject = student.grades
  var actualNumbers = Object.values(student.grades)
  console.log (grades.average(actualNumbers), student)
  //console.log (Math.max(grades.average(actualNumbers)), student)
  return grades.average(actualNumbers)
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var gpaArray = []
  for (var i = 0; i<data.length; i ++){
    gpaArray.push(grades.getGPA(data[i]))
  }
  var maxIndex = 0
  for (var i = 0; i<gpaArray.length; i++){
    if (gpaArray[i] > gpaArray[maxIndex]){
      maxIndex = i
    }
  }
  return data[maxIndex]

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
  // YOUR CODE HERE
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
};
