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
  var ans = 0;
  if (arr.length === 0) {
    return ans;
  }
  for (var i = 0; i < arr.length; i++) {
    ans+= arr[i];
  }
  return ans / arr.length;
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
  if (student === undefined) {
    return 1.5;
  }
  var ans = [];
  _.forEach(student.grades, function(value, key) {
    ans.push(value);
  });
  return grades.average(ans);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var ansgpa = grades.getGPA(data[0]);
  var ansobj = data[0];
  for (var i = 0; i < data.length; i++) {
    if (ansgpa < grades.getGPA(data[i])) {
      ansgpa = grades.getGPA(data[i]);
      ansobj = data[i];
    }
  }
  return ansobj;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var objdata = _.groupBy(data, function(student) {
    return student.major;
  });
  var highest = 0;
  var ans = null;
  for (var key in objdata) {
    var accum = 0;
    for (var i = 0; i < objdata[key].length; i++) {
      accum += grades.getGPA(objdata[key][i]);
    }
    var a = accum / objdata[key].length;
    if (highest < a) {
      highest = a;
      ans = key;
    }
  }
  return ans;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var objdata1 = _.groupBy(data, function(student) {
    return student.grades.class1;
  });
  var objdata2 = _.groupBy(data, function(student) {
    return student.grades.class2;
  });
  var sum1 = 0;
  for (var key in objdata1) {
    sum1 += objdata1[key].length * key;
  }
  var avg1 = sum1 / data.length;
  var sum2 = 0;
  for (var key2 in objdata2) {
    sum2 += objdata2[key2].length * key2;
  }
  var avg2 = sum2 / data.length;
  var ans = {};
  ans['class1'] = avg1;
  ans['class2'] = avg2;
  return ans;
};
