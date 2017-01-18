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
  if(arr.length === 0) return 0;
  var arrSum = _.reduce(arr, function(a, b) {
    return a + b;
  });
  return arrSum / arr.length;
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
  var arr = grades.getValues(student.grades);
  return grades.average(arr);
};

grades.getValues = function(object) {
  var arr = [];
  _.forEach(object, function (value, key) {
    arr.push(value);
  });
  return arr;
}

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var arrObj = _.groupBy(data, function(person) {
    return grades.getGPA(person);
  });
  var keys = grades.getKeys(arrObj);
  //console.log(keys);
  var highestGPA = _.reduce(keys, function(a, b) {
    return a > b ? a : b;
  });
  highestGPA = highestGPA + "";
  return arrObj[highestGPA][0];
}
// helper function
grades.getKeys = function(object) {
  var arr = [];
  _.forEach(object, function (value, key) {
    arr.push(key);
  });
  return arr;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var arrObj = _.groupBy(data, function(person) {
    return person.major;
  });
  //console.log(arrObj);
  var majorGPA = _.mapObject(arrObj, function(value, key) {
    var gpaArray = _.map(value, grades.getGPA);
    return grades.average(gpaArray);
  });
  // console.log(majorGPA);
  var highestGPA = _.reduce(grades.getValues(majorGPA), function(a, b) {
    return a > b ? a : b;
  });

  for(var key in majorGPA) {
    if(highestGPA === majorGPA[key]) {
      return key;
    }
  }
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an
// object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {

  var dataCopy = data.slice();
  var first = dataCopy.shift();
  var class1 = _.reduce(dataCopy, function(a, b) {
    return a + b['grades']['class1'];
  }, first['grades']['class1']);
  var class1GPA = class1 / (dataCopy.length + 1);

  var class2 = _.reduce(dataCopy, function(a, b) {
    return a + b['grades']['class2'];
  }, first['grades']['class2']);
  // we still need to divide class1/#students
  var class2GPA = class2 / (dataCopy.length + 1);

  console.log(dataCopy.length);

  // create object to return containing avg GPAs of class 1 // class 2
  var retObj = {
    class1: class1GPA,
    class2: class2GPA
  };
  return retObj;

};
