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
  return _.reduce(arr, function(a, b) {
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
grades.getGPA = function(student) {
  return (student.grades.class1 + student.grades.class2) / 2;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  return _.reduce(data, function(max, curr) {
  	return grades.getGPA(max) > grades.getGPA(curr) ? max : curr;
  });
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {

  var groupByMajor = _.groupBy(data, function(student) {
  	return student.major;
  });

  var groupedGrades = _.mapObject(groupByMajor, function(value, key) {
  	return grades.average(Object.values(_.mapObject(value, grades.getGPA)));
  });

  var maxGPA = 0;
  var GPAName = "";
  _.forEach(groupedGrades, function(value, key) {
  	if (value > maxGPA) {
  		maxGPA = value;
  		GPAName = key;
  	}
  });
  return GPAName;
};


// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, 
//`class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var class1Grades = 0;
  var class2Grades = 0;
  _.forEach(data, function(value, key) {
  	class1Grades += value.grades.class1;
  	class2Grades += value.grades.class2;
  });

  return {"class1": class1Grades / data.length, "class2" : class2Grades / data.length};

};
