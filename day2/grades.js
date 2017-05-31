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
  var sum = 0;
  var count = 0;
  _.forEach(arr, function(n){
    sum+=n;
    count++;
  })
  if(count) return sum/count
  return 0
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
  var arr = [student.grades.class1, student.grades.class2];
  return grades.average(arr);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  return _.reduce(data, function (a, b){
    if(grades.getGPA(a) > grades.getGPA(b)){
      return a
    }
    return b
  })
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {

  var majorArr = _.groupBy(data, function(n){
    return n.major;
  })

  //console.log(majorArr);
  var test = _.mapObject(majorArr, function(n){
    return grades.average(_.map(n,function(m){
      return grades.getGPA(m);
    })
  )
  })
  var majorArr = _.pairs(test);
  //console.log(majorArr)

  var max = 0;
  var major1 = "";

  for(var i = 0; i < majorArr.length; i++){
    if(majorArr[i][1] > max){
      max = majorArr[i][1]
      major1 = majorArr[i][0]
    }
  }
  return major1
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var class1GPA = [];
  var class2GPA = [];
  _.forEach(data, function(n){
    class1GPA.push(n.grades.class1);
    class2GPA.push(n.grades.class2);
  })

  var class1AVG = grades.average(class1GPA);
  var class2AVG = grades.average(class2GPA);

  var results = {
    'class1': class1AVG,
    'class2': class2AVG
  }

 return results

};
