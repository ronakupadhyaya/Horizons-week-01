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
  if (arr.length<1){
    return 0;
  }
  var ave = _.reduce(arr, function(a,b){
    return a+b;
  });
  if (ave === 0){
    return 0;
  }
  return ave/arr.length;
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
  var array = []
  _.forEach(student.grades, function(value,key){
    array.push(value);
  });
  //console.log(array);
  return grades.average(array);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var highest = data[0];
  _.forEach(data, function(student){
    var gpa = grades.getGPA(student);
    var higher = grades.getGPA(highest);
    if (gpa>higher){
      highest = student;
    }
  });
  return highest;
  //console.log(data);
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var ne = _.groupBy(data, function(student){
    return student.major;
  });

  ne = _.mapObject(ne, function(value,key){
    var gpas = []
    value.forEach(function(item){
      gpas.push(grades.getGPA(item));
    });
    return grades.average(gpas);
  });
  // var array = []
  // _.forEach(ne, function(value,key){
  //   array.push([key,value]);
  // });
  var bestM = '';
  var bestGPA = 0;
  _.forEach(ne,function(value, key){
    if (value>bestGPA){
      bestGPA = value;
      bestM = key;
    }
  });
  console.log(ne);
  return bestM;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var class1 = [];
  var class2 = [];
  var array = [];
  data.forEach(function(item){
    array.push(item.grades);
  });
  //console.log(array);

  array.forEach(function(item){
    class1.push(item.class1);
    class2.push(item.class2);
  })
  //console.log(class1);
  var new1 = class1.reduce(function(a,b){
    return a+b;
  },0);
  var new2 = class2.reduce(function(a,b){
    return a+b;
  },0);
  var ave1 = new1/class1.length;
  var ave2 = new2/class2.length;
  console.log(ave1);
  console.log(ave2);
  var returnObject = {
    'class1': ave1,
    'class2': ave2
  };
  console.log(returnObject);
  return returnObject;
  //console.log(data);
};
