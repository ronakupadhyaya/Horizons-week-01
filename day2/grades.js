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
  if (arr.length === 0) {
  	return 0; 
  }; 
  var total = _.reduce(arr, function(a, b) {return a+b;}, 0) 
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
  return grades.average([student.grades.class1, student.grades.class2]); 
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
 var highest = data[0]
 	for (var i = 1; i < data.length; i++) {
 		if (grades.getGPA(data[i]) > grades.getGPA(highest)) {
 			highest = data[i]
 		}
 	}
 	return highest; 
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
var byMajor = _.groupBy(data, function(student) {
    return student.major;
  });

 var objectGPA = _.mapObject(byMajor, function(stuArray, major) {
 	return _.map(stuArray, function(student) {
 		return grades.getGPA(student)
 	}); 
 });

 var aveGPA = _.mapObject (objectGPA, function(arr, major) {
 	return grades.average(arr); 
 }); 
 console.log("Object with ave GPA's", aveGPA); 

var maxGPA = 0
var majorMaxGPA = ''
_.forEach(aveGPA, function(value, key) {
	if (value > maxGPA) {
		maxGPA = value 
		majorMaxGPA = key
	}
}); 
return majorMaxGPA;  
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var class1Grades = [];
  var class2Grades = [];
  _.forEach(data, function (student) {
  	class1Grades.push(student.grades.class1)
  	class2Grades.push(student.grades.class2)
  }); 
 var aveGrade = {
 	'class1': grades.average(class1Grades),
 	'class2': grades.average(class2Grades)
 }; 
 return aveGrade;  
}; 


















