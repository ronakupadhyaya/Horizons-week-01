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
  var return_val = _.reduce(arr, function(a, b) {
  	return a+b;
  }, 0)
  return arr.length>0 ? return_val/arr.length : return_val
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
  var arr = []
  _.forEach(student.grades, function(value) {
  	arr.push(value)
  })
  return grades.average(arr)
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var arr = []
  _.forEach(data, function(student) {
  	arr.push(grades.getGPA(student))
  })
  var maxGPA = 0;
  var index = -1;
  for (var i=0; i<arr.length; i++) {
  	if (arr[i] > maxGPA) {
  		maxGPA = arr[i]
  		index = i
  	}
  }
  return data[index]
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  // console.log(data)
  data = _.groupBy(data, function(student) {
  	return student.major
  })
  // console.log(data)

  function getGPAMajor(major) {
  	return grades.average(major.map(grades.getGPA))
  }

  console.log(data)
  var temp = _.mapObject(data, getGPAMajor)
  console.log(temp)

  var bestMajor = ""
  var bestGPA = -1
  _.forEach(temp, function(value, key) {
  	// console.log(value, key)
  	if (value > bestGPA) {
  		bestGPA = value
  		bestMajor = key
  	}
  })
  return bestMajor
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE

  var newData={
    class1: [],
    class2: []
  };
  console.log(newData);
  data.forEach(function(student){
    _.forEach(student.grades, function(value, key){
      key==="class1" ? newData.class1.push(value) : newData.class2.push(value);

    })
    
    //use underscore for each because only way to use for each on object
  })
  console.log(newData);
  // var c1Average=0;
  // var c2Average=0;
  newData.class1=grades.average(newData.class1)
  newData.class2=grades.average(newData.class2)

return newData;
  console.log(newData.class1);

  // console.log(newData.class1);

// grades.average = function(arr) {
//   // YOUR CODE HERE
//   var return_val = _.reduce(arr, function(a, b) {
//   	return a+b;
//   }, 0)
//   return arr.length>0 ? return_val/arr.length : return_val
// };
  
};