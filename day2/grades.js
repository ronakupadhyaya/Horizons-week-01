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
  if (arr.length === 0)
    return 0;
  var x = _.reduce(arr, function(a, b){
    return a + b;
  })
  return x/arr.length;
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
  var gObj = student.grades;
  var gr = [];
  for (var key in gObj) {
    gr.push(gObj[key]);
  }
  return grades.average(gr);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var gpa = _.map(data, function(val) {
    return grades.getGPA(val);
  });
  var max = _.reduce(gpa, function(a, b) {
    return Math.max(a,b);
  });
  var sInd = gpa.indexOf(max);
  return data[sInd];
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var obj = _.groupBy(data, function(stud){
    return stud.major;
  });
  var obj2 = _.mapObject(obj, function(val, key) {
    return grades.avGPAFromArr(val);
  });
  var majors = _.keys(obj2);
  var gpas = _.values(obj2);
  var max = _.reduce(gpas, function(a, b) {
    return Math.max(a,b);
  });
  return majors[gpas.indexOf(max)];
};


/* HELPER METHOD: returns average gpa from an array student objects
*/
grades.avGPAFromArr = function(arr) {
  var gpa = _.map(arr, function(val) {
    return grades.getGPA(val);
  });
  return grades.average(gpa);
};


// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object
// with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var gr = _.map(data, function(stud) {
    return stud.grades;
  })
  var c1 = [];
  var c2 = [];
  gr.forEach(function(gradeObj) {
    c1.push(gradeObj.class1);
    c2.push(gradeObj.class2);
  });
  var avc1 = grades.average(c1);
  var avc2 = grades.average(c2);
  var final = {
    class1: avc1,
    class2: avc2
  }
  return final;
};
