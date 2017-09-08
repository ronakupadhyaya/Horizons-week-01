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
  function sum(a, b) {
    return a + b;
  }

  if (arr.length === 0) { // if(_.isEqual(arr, [])) PRO WAY ft. ANDRO$
    return 0;
  }

  else {
    return _.reduce(arr, sum) / arr.length;
  }



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
  var gradesArr = Object.values(student.grades);
  return grades.average(gradesArr)
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var gpaArray = []
  function max(a,b) {
    if (a >= b) {
      return a;
    }
    return b;
  }

  for (var i = 0; i < data.length; i++) {
    gpaArray.push(grades.getGPA(data[i])) // data[i] iterates through student objects
  }
  console.log(gpaArray);
  var topGpa = _.reduce(gpaArray, max);
  console.log(topGpa); // returns highest GPA

  for (var i = 0; i < data.length; i++) {
    if (grades.getGPA(data[i]) === topGpa) {
      return data[i];
    } // data[i] iterates through student objects
  }

  // find way to take take topGpa and return the student that holds it as an object
}


// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects [studentData] and returns the major with the
// highest average GPA .
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
  // _.groupBy  _.mapObject  _.
  // create something that returns unique values of major key and counts their occurences

  function max(a,b) {
    if (a >= b) {
      return a;
    }
    return b;
  }

  function sum(a, b) {
    return a + b;
  }

  var majorGPAs = [] //
  // var majorGPAsArr2d = [] // array of major GPA arrays (numbers)
  var avgMajorGPAs = [] // array of avg GPA of each major (one per major)

  var majors =[];

  for (var i = 0; i < data.length; i++) {
    if(majors.indexOf(data[i].major) === -1){
      majors.push(data[i].major);
    }
  }
  console.log(majors);
  for(var i =0; i < majors.length; i++){
      var majorGPAsArr2d = [];
      for(var j =0; j< data.length; j++){
        if(data[j].major === majors[i]){
          majorGPAsArr2d.push(grades.getGPA(data[j]));
        }
      }
      majorGPAs.push(majorGPAsArr2d);
  }

  for(var i = 0; i <majorGPAs.length;i++){

    var dummy = _.reduce(majorGPAs[i], sum);
    var average = dummy/majorGPAs[i].length;
    avgMajorGPAs.push(average);
  }

  var maxGPA = _.reduce(avgMajorGPAs, max);

  for(var i = 0; i < majors.length; i++){
    var majorGPAsArr2d = [];
    for(j = 0; j < data.length; j++){
      if(data[j].major === majors[i]){
        majorGPAsArr2d.push(grades.getGPA(data[j]));
      }
    }
    var dummy = _.reduce(majorGPAsArr2d, sum);
    var average = dummy/majorGPAsArr2d.length;
    if(average === maxGPA){
      return majors[i];
    }
  }

};


// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
};
