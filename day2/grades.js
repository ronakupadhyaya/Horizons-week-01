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
  return arr.reduce(function(a,b){
    return a + b
  }) / arr.length;
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
  _.forEach(student.grades, function(value,key) {
    arr.push(value);
  })
  return grades.average(arr);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  return data.reduce(function(s1,s2) {
    if (grades.getGPA(s1) > grades.getGPA(s2)) {
      return s1;
    } else {
      return s2;
    }
  });
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var obj = _.groupBy(data, function(student) {
    return student.major;
  })
  var majorAvgs = [];
  _.forEach(obj, function(students,major) {
    var total = 0;
    students.forEach(function(student) {
      total += grades.getGPA(student);
    })
    var avg = total/students.length;
    majorAvgs.push([major,avg]);
  })
  var topMajor = majorAvgs.reduce(function(m1, m2) {
    if (m1[1] > m2[1])
      return m1
    else
      return m2
  })
  return topMajor[0];
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var arrClass1 = [];
  var arrClass2 = [];
  _.forEach(data, function (student) {
    arrClass1.push(student.grades.class1);
    arrClass2.push(student.grades.class2);
  })
  // get averages of each array
  var avgClass1 = _.reduce(arrClass1, function(a,b) {
    return a + b;
  }) / arrClass1.length;
  var avgClass2 = _.reduce(arrClass2, function(a,b) {
    return a + b;
  }) / arrClass2.length;
  var obj = {};
  obj['class1'] = avgClass1;
  obj['class2'] = avgClass2;
  return obj;
};
