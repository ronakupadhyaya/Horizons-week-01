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
  if(arr.length === 0){
    return 0;
  }
  var total = _.reduce(arr, function(a,b){
    return a + b;
  });

  return total/arr.length;
};

// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes a Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA() -> 1.5
// ex. grades.getGPA([0, 0]) -> 0
//
// hint. use grades.average
grades.getGPA = function(student) {
  var grade = [];
  grade.push(student.grades.class1);
  grade.push(student.grades.class2);
  return grades.average(grade);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  return _.reduce(data, function(a,b){
    if(grades.getGPA(a) > grades.getGPA(b)){
      return a;
    } else {
      return b;
    }
  });
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {

  var obj = _.groupBy(data, function(a){
    return a.major;
  });

  var nObj = _.mapObject(obj, function(major){
    return major.map(function(student){
      return grades.getGPA(student);
    });
  });

  var bObj = _.mapObject(nObj, function(gpas, major){
    return grades.average(gpas);
  });

  var arr = _.pairs(bObj);
  console.log(arr);

  var max = 0;
  var major;
  for(var i = 0; i < 4; i++){
    if(arr[i][1] > max){
      max = arr[i][1];
      major = arr[i][0];
    }
  }

  return major;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var arr1 = [];
  var arr2 = [];

  data.forEach(function(student){
    arr1.push(student.grades.class1);
    arr2.push(student.grades.class2);
  });

  return {class1: grades.average(arr1), class2: grades.average(arr2)};
}
