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

  var newArray = _.reduce(arr, function(a,b) {
    return a+b;
  });
  return newArray/arr.length;
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
  var newArray = _.reduce(data, function(a,b) {
    if(grades.getGPA(a)>grades.getGPA(b)){
      return a;
    }else{
      return b;
    }
  });
  console.log(newArray.major);
  return newArray;

}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var newArray =[];
  _.forEach(data, function(n) {
    newArray.push([n.major, grades.getGPA(n)]);
  });
  var economicsArray =[];
  var filmStudiesArray =[];
  var csArray = [];
  var artHistoryArray =[];
  _.forEach(newArray, function(n) {
    if(n[0] === 'Computer Science'){
      csArray.push(n[1]);
    }
    if(n[0] === 'Film Studies'){
      filmStudiesArray.push(n[1]);
    }
    if(n[0] === 'Art History'){
      artHistoryArray.push(n[1]);
    }
    if(n[0] === 'Economics'){
      economicsArray.push(n[1]);
    }
  });
  var avgEcon = grades.average(economicsArray);
  var avgFilm = grades.average(filmStudiesArray);
  var avgCS = grades.average(csArray);
  var avgArtHistory = grades.average(artHistoryArray);

  if(avgEcon > avgFilm && avgEcon > avgCS && avgEcon > avgArtHistory){
    return 'Economics';
  }
  if(avgFilm > avgCS && avgFilm > avgArtHistory){
    return 'Film Studies';
  }
  if(avgCS > avgArtHistory){
    return 'Computer Science';
  } else {
    return 'Art History';
  }
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var newArray =[];
  var newnewArray = [];
  _.forEach(data, function(n){
    newArray.push(n.grades.class1);
    newnewArray.push(n.grades.class2);
  });

var avgClass1 = grades.average(newArray);
var avgClass2 = grades.average(newnewArray);

var object = {};
object.class1 = avgClass1;
object.class2 = avgClass2;

return object;

/*  _.forEach(newArray, function(grade) {
    finalArray.push([grade]);
  });
*/
};
