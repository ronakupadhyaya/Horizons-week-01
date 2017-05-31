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
  if(arr.length === 0){
    return 0;
  }

  var sum = _.reduce(arr, function(a, b){
    return a + b;
  }, 0);
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
  return grades.average([student.grades.class1, student.grades.class2]);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var gpas = _.map(data, function(value){
    return grades.getGPA(value);
  });

  var index = 0;
  for(var i = 1; i < gpas.length; i++){
    if(gpas[i] > gpas[index]){
      index = i;
    }
  }

  return data[index];
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // Group By Major
  var majors = _.groupBy(data, function(student){
    return student.major;
  });

  var majorGPA =  _.mapObject(majors, function(majorArr){
    return grades.average(_.map(majorArr, grades.getGPA));
  });

  var averageGPAs = _.values(majorGPA);
  var index = 0;
  for(var i = 1; i < averageGPAs.length; i++){
    if(averageGPAs[i] > averageGPAs[index]){
      index = i;
    }
  }

  return _.keys(majorGPA)[index];
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var classGrades1 = [];
  var classGrades2 = [];
  _.forEach(data, function(student){
    classGrades1.push(student.grades.class1);
    classGrades2.push(student.grades.class2);
  });

  var classAverage1 = grades.average(classGrades1);
  var classAverage2 = grades.average(classGrades2);
  return {'class1' : classAverage1, 'class2' : classAverage2};
};
