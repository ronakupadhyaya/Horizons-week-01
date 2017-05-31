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
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
  	sum += arr[i];
  }
  return sum/arr.length;
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
	var highest = data[0];
  for (var i = 0; i < data.length; i++) {
  	if (grades.getGPA(data[i]) > grades.getGPA(highest)) {
  		highest = data[i];
  	}
  }
  return highest;
}

grades.averageGPA = function(students) {
	var sum = 0;
	for (var i = 0; i < students.length; i++) {
		sum += grades.getGPA(students[i]);
	}
	return sum/students.length;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
	//console.log(data);
  var groupByMajor = _.groupBy(data, function(student) {
  	return student.major;
  });
  var highestGPAMajor = 0;
  var answer = "";
  console.log(groupByMajor);
  for (var key in groupByMajor) {
  	if (groupByMajor.hasOwnProperty(key)) {
  		if (grades.averageGPA(groupByMajor[key]) > highestGPAMajor) {
  			highestGPAMajor = grades.averageGPA(groupByMajor[key]);
  			answer = key;
  		}
  	}
  }
  return answer;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
	var sum1 = 0;
	var sum2 = 0;
  for (var i = 0; i < data.length; i++) {
  	sum1 += data[i].grades.class1;
  	sum2 += data[i].grades.class2;
  }
  return {'class1': sum1/data.length, 'class2': sum2/data.length};
};
