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
  // if (arr.length === 0) {
  //   return 0;
  // }
 return _.reduce(arr,function(a,b) {
    return a+b;
  },0) / (arr.length === 0 ? 1 : arr.length);

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
  var gradess = [student.grades.class1, student.grades.class2];
  return grades.average(gradess);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  return data.reduce(function(a,b) {
    if (grades.getGPA(a)> grades.getGPA(b) ){
      return a;
    } else {
      return b;
    }
  })
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var a = _.groupBy(data, function (person) {
    return person.major;
  });
  var b=_.mapObject(a, function (val,key) {
    var stuGPAarray = [];
    val.forEach(function (item) {
      stuGPAarray.push( grades.getGPA(item));

    });
    // console.log("student of " + key + " is " + grades.average(stuGPAarray));
    return grades.average(stuGPAarray);

  });
  var accumulator = '';
  var num =0;
   _.each (b, function (val,key) {
    if (val>num) {
      accumulator = key;
      num=val;}
    });
    return accumulator;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var arr1=[];
  var arr2=[];
  for (var i=0;i<data.length;i++) {
    arr1.push(data[i].grades.class1);
    arr2.push(data[i].grades.class2);
  }
  return {'class1':grades.average(arr1),'class2':grades.average(arr2)};
};
