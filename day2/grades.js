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
  if (!(arr.length)) {
    return 0;
  }
  else {
    var sum = _.reduce(arr, function (a, b) {
      return a + b;
    }, 0);
    return (sum / arr.length);
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
  var grade = [];
  _.forEach(student.grades, function (value, key) {
    grade.push(value);
  });
  //console.log(grade);
  return grades.average(grade);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var max_student = '';
  var max_gpa = 0;
  for (var i=0; i<data.length;i++) {
    var GPA = grades.getGPA(data[i]);
    if (GPA > max_gpa) {
      max_gpa = GPA;
      max_student = data[i];
    }
  }
  //console.log(max_gpa, max_student, data);
  return max_student;
};

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {

  var majors = _.groupBy(data, function(item) {
    return item.major;
  });

  var majorGPAs = _.mapObject(majors, function(value,key) {
    var gpas = [];
    value.forEach(function(item) {
      gpas.push(grades.getGPA(item));
    });
    return grades.average(gpas);
  });

  var best_major = '';
  var best_gpa = 0;
  _.forEach(majorGPAs, function(value,key) {
    if (value > best_gpa) {
      best_gpa = value;
      best_major = key;
    }
  });
  return best_major;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var classes = [];
  data.forEach(function(item) {
    classes.push(item.grades);
  });

  console.log(classes);

  var classMap = {};
  classes.forEach(function(item) {
    _.forEach(item, function(value,key) {
      if (key in classMap) {
        classMap[key].push(value);
      }
      else {
        console.log("yesy");
        classMap[key] = [value];
      }
    })
  });

  console.log(classMap);

  var avgGPAPerClass = _.mapObject(classMap, function (value, key) {
    return grades.average(value);
  })

  return avgGPAPerClass;
};
