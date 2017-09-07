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
  if(arr.length === 0){
    return 0;
  }
  function sum(a,b){
    return a + b;
  }
  var total = _.reduce(arr, sum)
  return total/arr.length;
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
  //console.log(student.grades)
  var studentGrades = [];
  _.forEach(student.grades, function(grade){
    studentGrades.push(grade);
  });
  return grades.average(studentGrades);

};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  //console.log(data);
  //console.log(data[0]);
  var nerd = data[0].name;
  var nerdGPA = grades.getGPA(data[0]);
  //console.log(nerdGPA);
  //console.log(nerd);
  _.forEach(data, function(student){
    //console.log(student.grades);
    //console.log(grades.getGPA(student));
    if(nerdGPA < grades.getGPA(student)){
      nerdGPA = grades.getGPA(student);
      nerd = student
    }
  });
  return nerd;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the
// highest average GPA.
//
// Group students by major, calculate their GPAs, then find the average GPA for students
// with a given major.
//
// For example, if all the students that have the "Economics" major
// average their GPA's together and get 3.4 and all other majors' averages are less than that,
// then "Economics" would be the return value.
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var sorted = _.groupBy(data, function(student){
    return student.major;
  });
  var geekSquadGPA = 0;
  var geekSquad = null;
  _.forEach(sorted, function(val, key){
    var averages = [];
    val.forEach(function (student){
      var studentGrades = [student.grades.class1, student.grades.class2];
      averages.push(grades.average(studentGrades));
    });
    val = grades.average(averages);
    if(val > geekSquadGPA){
      geekSquadGPA = val;
      geekSquad = key;
    }
  });
  return geekSquad;
}

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns
//an object with two keys, `class1` and `class2`, with values that correspond
//to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var class1grades = [];
  var class2grades = [];
  data.forEach(function (student){
    class1grades.push(student.grades.class1);
    class2grades.push(student.grades.class2);
  });
  var class1mean = grades.average(class1grades);
  var class2mean = grades.average(class2grades);

  return {class1: class1mean, class2: class2mean};
};
