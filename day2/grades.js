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
grades.average = function (arr) {
  if (arr.length === 0) {
    return 0;
  }
  return _.reduce(arr, function (a, b) {
    return a + b;
  }, 0) / arr.length;
};

// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes an Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA() -> 1.5
// ex. grades.getGPA([0, 0]) -> 0
//
// hint. use grades.average
grades.getGPA = function (student) {
  return (student["grades"]["class1"] + student["grades"]["class2"]) / 2;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function (data) {
  return _.reduce(data, function (student1, student2) {
    if (grades.getGPA(student1) > grades.getGPA(student2)) {
      return student1;
    }
    return student2;
  });
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function (data) {
  var groups = _.groupBy(data, function (student) {
    return student["major"];
  });

  var majorAvgs = _.mapObject(groups, function (students, major) {
    return grades.average(_.map(students, function (student) {
      return grades.getGPA(student);
    }));
  });

  return _.reduce(_.pairs(majorAvgs), function (a, b) {
    return a[1] > b[1] ? a : b;
  })[0];
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function (data) {
  var gradesheet = _.map(data, function (student) {
    return student["grades"];
  });
  gradesheet = _.map(gradesheet, function (gradePair) {
    return [gradePair["class1"], gradePair["class2"]];
  });
  console.log(gradesheet);
  var avgGrades = _.reduce(gradesheet, function (gradePair1, gradePair2) {
    return [gradePair1[0] + gradePair2[0], gradePair1[1] + gradePair2[1]];
  });
  return {
    'class1': avgGrades[0] / gradesheet.length,
    'class2': avgGrades[1] / gradesheet.length
  };
};
