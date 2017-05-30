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
  if (arr.length === 0) return 0
  var sum = 0
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum / arr.length
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
  return grades.average([student.grades.class1, student.grades.class2])
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var maxGPA = 0;
  var maxStudent = {}
  for (var i = 0; i < data.length; i++) {
    var currentGPA = grades.getGPA(data[i])
    if (currentGPA > maxGPA) {
      maxGPA = currentGPA
      maxStudent = data[i]
    }
  }
  return maxStudent
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var majorObj = _.groupBy(data, function(student) {
    return student.major
  })
  var arr = []
  for (var property in majorObj) {
    // console.log(property)
    if (majorObj.hasOwnProperty(property)) {
      var arrayStudents = majorObj[property]
      var averages = []
      for (var j = 0; j < arrayStudents.length; j++) {
        averages.push(grades.getGPA(arrayStudents[j]))
      }
      var majorAvg = grades.average(averages)
      arr.push([property, majorAvg])
    }
  }
  var max = 0
  var maxMaj = ""
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][1] > max) {
      max = arr[i][1]
      maxMaj = arr[i][0]
    }
  }
  return maxMaj
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var classOne = 0
  var classTwo = 0
  for (var i = 0; i < data.length; i++) {
    var student = data[i]
    classOne += student.grades.class1
    classTwo += student.grades.class2
  }
  return {'class1': classOne / data.length, 'class2': classTwo / data.length}
};













