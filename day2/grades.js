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
  return _.reduce(arr,function(a,b){
    return a + b
  })/ arr.length
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

  var class1 = student.grades.class1;
  var class2 = student.grades.class2;
  var gpa = grades.average([class1, class2]);
  return gpa;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var high = 0;
  var best = {};
  _.forEach(data, function(student){
    var gpa = grades.getGPA(student)
    if(high < gpa){
      high = gpa;
      best = student;
    }
  })
  return best;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var majors ={};
  _.forEach(data, function(student){
    if(majors[student.major] === undefined){
      majors[student.major] = [0,0];
    }
    majors[student.major][0] = majors[student.major][0]+grades.getGPA(student);
    majors[student.major][1] = majors[student.major][1]+1;
  });
  majors = _.mapObject(majors, function(val,key){
    return val[0]/val[1];
  });
  console.log(majors)
  return _.findKey(majors,function(major){
    return major === _.max(majors);
  });
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  //debugger;

  var class1 = 0;
  var class2 = 0;
  var result = {};
  _.forEach(data, function(student) {
    class1 += student.grades.class1;
    class2 += student.grades.class2;
  })
  var studentsLength = data.length;
  var class1Average = class1 / studentsLength;
  var class2Average = class2 / studentsLength;

  return result = {"class1" : class1Average,
                   "class2" : class2Average};

};
