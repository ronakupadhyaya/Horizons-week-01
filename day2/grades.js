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

  var majors = _.groupBy(data, function(student){
    return student.major;
  })

  // 13 in econ, 8 in art, 10 in cs, 14 in Film
  //debugger;
  //object, array, object { [ { } ] }
  var Econ = [];
  var Art = [];
  var Film = [];
  var cs = [];

  //Economic -->

  for (var key in majors) { //loop through keys...Economics, Art History, etc.

    if (majors.hasOwnProperty(key)) {
      if (key === "Economics") {
        //debugger;
        for (var i = 0; i < majors[key].length; i++) {
          var econSum1 = ( majors[key][i].grades.class1 );
          var econSum2 = ( majors[key][i].grades.class2 );
          Econ.push(econSum1 + econSum2);
          var econStudents = majors[key].length;
        }

      }
      if (key === "Art History") {
        for (var i = 0; i < majors[key].length; i++) {
          var artSum1 = ( majors[key][i].grades.class1 );
          var artSum2 = ( majors[key][i].grades.class2 );
          Art.push(artSum1 + artSum2);
          var artStudents = majors[key].length;

        }
      }
      if (key === "Film Studies") {
        for (var i = 0; i < majors[key].length; i++) {
          var filmSum1 = ( majors[key][i].grades.class1 );
          var filmSum2 = ( majors[key][i].grades.class2 );
          Film.push(filmSum1 + filmSum2);
          var filmStudents = majors[key].length;

        }
      }
      if (key === "Computer Science") {
        for (var i = 0; i < majors[key].length; i++) {
          var csSum1 = ( majors[key][i].grades.class1 );
          var csSum2 = ( majors[key][i].grades.class2 );
          cs.push(csSum1 + csSum2);
          var csStudents = majors[key].length;

        }
      }
    }
  }

  var artSum, csSum, filmSum;
  var artAve, csAve, filmAve, econAve;
  var econSum = Econ.reduce(function(a, b){
    return a + b;
  })
  econAve = econSum / econStudents;
  var artSum = Art.reduce(function(a, b){
    return a + b;
  })
  artAve = artSum / artStudents;
  var csSum = cs.reduce(function(a, b){
    return a + b;
  })
  csAve = csSum / csStudents;
  var filmSum = Film.reduce(function(a, b){
    return a + b;
  })
  filmAve = filmSum / filmStudents;

  // compare values
  var arr = [];
  arr.push(filmAve, csAve, artAve, econAve);
  var biggest = Math.max(filmAve, csAve, artAve, econAve);
  for (var i =0; i < arr.length; i++) {
    if (arr[0] === biggest){
      return "Film Studies";
    } else if (arr[1] === biggest) {
      return "Computer Sciece";
    } else if (arr[2] === biggest) {
      return "Art History";
    } else {
      return "Economics";
    }
  }









}






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

}
