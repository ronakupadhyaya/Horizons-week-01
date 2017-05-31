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
  var total = _.reduce(arr, function(a, b){ return a+b});
  if(arr.length === 0){
    return 0;
  }
  return total/arr.length;
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
  var arr = [];
  for(var key in student.grades){
    arr.push(student.grades[key]);
  };
  return grades.average(arr);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var maxGPA = 0;
  var returnObj;
  var tempGPA;
  _.forEach(data, function(n){
    tempGPA = grades.getGPA(n);
    if(tempGPA > maxGPA){
      maxGPA = tempGPA;
      returnObj = n;
    }});
  return returnObj;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var majorsGPA = [];
  var majorsGroup = _.groupBy(data, function(n){
    return n.major
  });
  for (var key in majorsGroup){
    var temp = [];
    var average = 0;
    var tempObj = new Object();
    _.forEach(majorsGroup[key], function(m){
      temp.push(grades.getGPA(m));
    });
    var average = grades.average(temp);
    tempObj.major = key;
    tempObj.avgGPA = average;
    majorsGPA.push(tempObj);
  }
  var bestMajor = _.reduce(majorsGPA, function(j,l){
    if (j.avgGPA > l.avgGPA) {
      return j
    }
    else { return l }
  })
  return bestMajor.major;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var classGroup = {
    class1: [],
    class2: []
  };
  _.forEach(data, function(n){
    for(var key in n.grades){
      classGroup[key].push(n.grades[key])
    }
  })
  _.forEach(classGroup, function(value,key){
    classGroup[key] = grades.average(value);
  })
  return classGroup;
}
