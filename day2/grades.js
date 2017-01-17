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
  if (arr.length === 0) {
    return 0;
  }
  var total = arr.reduce(function(a, b) {
    return a + b;
  });
  // console.log(total);
  return total / arr.length;
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
  // console.log(data);
  // forEach(student in data) {
  // console.log(data.keys);
  // }
  var highestGPA = 0;
  var highestStudent;
  // for (var i=0; i<data.length; i++){
  //   if (grades.getGPA(data[i])>highest){
  //     highest = grades.getGPA(data[i]);
  //     student = data[i];
  //   }
  // }
  // return student;

  _.forEach(data, function(student) {
    if (highestGPA < grades.getGPA(student)) {
      highestGPA = grades.getGPA(student);
      highestStudent = student;
    }
  });
  return highestStudent;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var student = grades.highestGPA(data);
  // return student.major;

  var majors = {};

  _.forEach(data, function(student) {
    if (_.isUndefined(majors[student.major])) {
      majors[student.major] = [0, 0]; //total points, # of students
    }
    majors[student.major][0] += grades.getGPA(student);
    majors[student.major][1]++;
  }); //fills the majors obj with all the majors that exist

  // _.mapObject(majors, function(){
  //   majors[3] = majors[0]/majors[1]; //GPA of major
  // });
  majors = _.mapObject(majors, function(value, key) {
    return value[0] / value[1]; //GPA
  });

  var majorArray = Object.keys(majors); //["Economics", "Art History", "Film Studies", "Computer Science"]
  // console.log(majorArray);

  var highestMajor = majorArray[0];
  var highestGPA = majors[majorArray[0]];

  for (var i = 1; i < majorArray.length; i++) {
    if (majors[majorArray[i]] > highestGPA) {
      highestGPA = majors[majorArray[i]];
      highestMajor = majorArray[i];
    }
  }
  return highestMajor;
}

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // console.log(data);
  var class1 = 0,
    class2 = 0;

  _.forEach(data, function(student) {
    class1 += student.grades.class1;
    class2 += student.grades.class2;
  })
  return {
    "class1": class1 / data.length,
    "class2": class2 / data.length
  }

};
