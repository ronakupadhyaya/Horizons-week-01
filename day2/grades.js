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
  if (arr.length !== 0) {
    var sum =  _.reduce(arr, function(a,b){
      return a+b;
    });
    return sum/arr.length;
  } else return 0;
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
  var gra = _.values(student.grades);
  return grades.average(gra);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var highGPA = _.reduce(data, function(a,b){
    if (grades.getGPA(a) >= grades.getGPA(b)) {
      return a;
    } else {
      return b;
    }
  });
  return highGPA;

}

grades.getGPAarr = function(arr) {
  var sum =  _.reduce(arr, function(a,b){
    console.log("A" + getGPA(a));
    return getGPA(a)+getGPA(b);
  });
  return 2;//sum / arr.length;
}
// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var majors = _.groupBy(data, function(stud) {
    return stud.major;
  });

  /*var student1 = _.mapObject(majors, function(studArr) {
    return grades.getGPAarr(studArr);
    //return studArr[0];
  })*/

  _.mapObject(majors, function(studArr){
    return grades.getGPAarr(studArr);
  })
  //console.log(majors);
  //console.log(student1);
  /*
  var GPAs =  _.mapObject(majors, function(val, key) {
    console.log(majors);
    return grades.getGPA(val);
  });
  */

/*  var test = _.mapObject(majors, grades.highestGPA());
  console.log(test);
*/

  return 0;
  //return grades.highestGPA(GPAs);
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
};
