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
  var count = 0;
  if(arr.length === 0) return 0;
  var num = _.reduce(arr,function(a,b){
    count ++;
    return (a * count + b) / (count + 1); /// another method to compute the average

  })
  // console.log(num);
  return num;

  // YOUR CODE HERE
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
  var listGrade = []
  // console.log(listGrade);
  listGrade.push(student.grades.class1);
  listGrade.push(student.grades.class2);
  return this.average(listGrade);
  // YOUR CODE HERE
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//

grades.highestGPA = function(data) {
  return _.reduce(data,function(a,b){
    var gpa1 = grades.getGPA(a); // cannot use 'this'
    var gpa2 = grades.getGPA(b);
    return gpa1 > gpa2 ? a : b;
  })
  // YOUR CODE HERE
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.findingAverage = function (students){
  var gpaList = [];
  students.forEach(function(student){
    gpaList.push(grades.getGPA(student));
  })
  var average = this.average(gpaList);
  return average;
}

grades.majorWithHighestGPA = function(data) {

  var highestMajor = '';
  var currentHigh = 0;
  var studentByMajor = _.groupBy(data,function(student){
    return student.major;
  })
  console.log(studentByMajor);
  _.forEach(studentByMajor,function(value,key){
    var average = grades.findingAverage(value);
    if (average > currentHigh){
      currentHigh = average;
      highestMajor = key;
    }
  })
  return highestMajor;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`,
// with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var totalNum = data.length;
  var totalForClass1 = 0;
  var totalForClass2 = 0;

  data.forEach(function(item){
    var gradesObj = item.grades;
    var class1 = gradesObj.class1;
    var class2 = gradesObj.class2;
    totalForClass1 += class1;
    totalForClass2 += class2;
  })
  var objAverage = {'class1':(totalForClass1/totalNum), 'class2': (totalForClass2/totalNum)};
  console.log(objAverage);
  return objAverage;
  // YOUR CODE HERE
};
