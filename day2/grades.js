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
  if (arr.length < 1) {
    return 0
  }
  var total = 0
  _.forEach(arr, function(n) {
    total += n
  })
  return total/arr.length
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
  var gradez = []
  gradez.push(student.grades.class1, student.grades.class2)
  return grades.average(gradez)
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // debugger
  var gpas = data.slice()
  gpas = gpas.map(grades.getGPA);
  var gpa = gpas.slice()
  gpa = gpa.reduce(function(a, b) {
    if (a > b) {
      return a;
    } else if (b > a) {
      return b;
    } else {
      return a
    }
  })
  return data[gpas.indexOf(gpa)]
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var grouped = _.groupBy(data, function(student) {
    return student.major
  })

  var avgMajorGpa = _.mapObject(grouped,
    function(studentArr) {
      var studentGpas = studentArr.map(grades.getGPA)

      return grades.average(studentGpas)
    }
  );

  var avgMajorGpaPairs = _.pairs(avgMajorGpa)
  var sortedAvgMajorGpaPairs = avgMajorGpaPairs.sort(function(major, major2) {
    return major[1] - major2[1];
  })
  return sortedAvgMajorGpaPairs[sortedAvgMajorGpaPairs.length-1][0]

};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var classAvg = {
    class1: [0, 0],
    class2: [0, 0]
  }

  _.mapObject(data, function(student) {
    classAvg.class1[0] += student.grades.class1
    classAvg.class1[1]++
    classAvg.class2[0] += student.grades.class2
    classAvg.class2[1]++
  })
  var finalObj = _.mapObject(classAvg, function(eachClass) {
    return eachClass[0] / eachClass[1]
  })

  return finalObj
};
