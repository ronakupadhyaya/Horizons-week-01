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
  var ans = 0
  for (var i =0; i<arr.length; i++){
    ans += arr[i];
  }
  return arr.length===0 ? 0: ans/arr.length;
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
  return grades.average(Object.values(student.grades));
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var highest = -999;
  var stu
  data.forEach(function(student){
    var gpa = grades.getGPA(student)
    if( gpa > highest){
      highest = gpa
      stu = student
    }
  })
  return stu;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var majors = _.groupBy(data,function(student){
    return student.major
  })
  //console.log(majors)
  var majorGPAs = _.mapObject(majors,function(arrStu,major){
    var GPAarr = []
    arrStu.forEach(function(student){
      GPAarr.push(grades.getGPA(student));
    })
    return grades.average(GPAarr)
  })

  var highest = -999;
  var maj
  for (var key in majorGPAs) {
  if (majorGPAs.hasOwnProperty(key)) {
    if (majorGPAs[key] > highest){
      highest = majorGPAs[key];
      maj = key
      }
    }
  }

  return maj;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var sum1 = []
  var sum2 = []
  data.forEach(function(student){
    sum1.push(student.grades.class1);
    sum2.push(student.grades.class2);
  })
  return {'class1': grades.average(sum1), 'class2': grades.average(sum2)}
};
