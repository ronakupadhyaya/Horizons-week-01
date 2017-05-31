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
  if( arr.length < 1){
    return 0
  }
  var x = _.reduce(arr,function(a,b){
    return a+b})

  return x/arr.length
  
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
  return grades.average([student.grades.class1, student.grades.class2])

};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE

  // assign initial highest GPA to result and update as a student with higher GPA is found
  var result = data[0]
  data.forEach(function(student){
    if(grades.getGPA(student) > grades.getGPA(result)){
      result = student;
    }
  });
  return result
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  

  // group by major
  var temp = _.groupBy(data, function(student){
    return student.major
  })
  var result = [];
  // add pair of major and GPA pair into result array
  _.forEach(temp, function(value, key){
    var sum = 0
    value.forEach(function(x){
      sum += grades.getGPA(x)
    })
    sum = sum / value.length;
    result.push([key, sum])
    
  })
  // loop through to determine the major with the highest GPA
  var high_major = result[0];
  result.forEach(function(x){
    if(x[1] > high_major[1]){
      high_major = x;
    }
  })
  // high_major[0] depicts the major name while [1] depicts the actual GPA
  return high_major[0]
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var class1GPA = 0;
  var class2GPA = 0;

  data.forEach(function(student){
    class1GPA += student.grades.class1
    class2GPA += student.grades.class2
  })

    class1GPA = class1GPA / data.length
    class2GPA = class2GPA / data.length

    var result = {};
    result['class1'] = class1GPA
    result['class2'] = class2GPA
    return result

};
