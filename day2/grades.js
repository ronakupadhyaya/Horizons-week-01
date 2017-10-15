"use strict";
/* globals grades, _: true */

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
  if (arr.length === 0) {
    return 0;
  }
  var ret = _.reduce(arr, function(memo, num) {
    return ( memo + num );
  });
  return (ret / arr.length);
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
  // YOUR CODE HERE
  var gradez = student.grades;
  var arr1 = _.map(gradez, function(value) {
    return value;
  });
  return ( grades.average(arr1) );
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var arr = _.map(data, function(student) {
    return grades.getGPA(student)
  });
  var max = Math.max.apply(Math, arr);
  var idxOf = arr.indexOf(max);
  return data[idxOf];
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
  var group = _.groupBy(data, function(person) {
    return person.major;
  });
  var students = _.map(group, function(val) {
    return val;
  });
  var arrArr = [];
  _.each(students, function(major) {
    var tmp = [];
    var gpas = _.map(major, function(pupil, idx) {
      if (idx !== 0) {
        tmp.push(grades.getGPA(pupil));
      }
      else if (idx === 0) {
        tmp.push(grades.getGPA(pupil));
        arrArr.push(tmp)
      }
    })
  })
  var avgMajorGPAs = _.map(arrArr, function(majorArr, idx, arrAvg) {
    return ( grades.average(majorArr) );
  });
  var max = Math.max.apply(Math, avgMajorGPAs);
  var maxIdx = avgMajorGPAs.indexOf(max);

  var ret = '';
  _.each(group, function(elem, idx, objArr) {
      _.each(objArr, function(inside) {
        if (inside.length === elem.length) {
          ret = idx;
          return;
        }
      })
  });
  console.log(ret);
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
};
