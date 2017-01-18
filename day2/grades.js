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
  var sum =  _.reduce(arr, function(a,b){
    return a+b;
  })
  return sum/arr.length;
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
  var values = Object.values(student);
  var classArr = Object.values(values[2]);
  return grades.average(classArr);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var max = data[0];

  _.forEach(data, function(a){
    if (grades.getGPA(a) >= grades.getGPA(max)){
      max = a;
    }
  });
  return max;
}


// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE

  // // separate students into major/class buckets
  // // returns objects of students
  // var majorList = _.groupBy(data, 'major');
  //
  // // get average gpa of the major
  // var gpas = [];
  // _.forEach(majorList, function(item){
  //   // average takes in a list of num
  //   //
  //   gpas.push(grades.;
  // })
  //
  //
  // return grades.highestGPA(gpas).major;

  var majorList = _.groupBy(data, 'major');

  var myObj = new Object();
  var arrGPA = [];
  _.forEach(majorList, function(value, key){
    // list of student myObj in major buckets
    var innerArr = [];
    _.forEach(value, function(item2){
      innerArr.push(grades.getGPA(item2));
    })
    myObj[key]= grades.average(innerArr);
    arrGPA.push(grades.average(innerArr));
  })
  var gpaKey = Math.max.apply(null,arrGPA);

  var majorNames = Object.keys(myObj)
  for (var i = 0; i < arrGPA.length; i ++){
    if (arrGPA[i]=== gpaKey){
      return majorNames[i];
    }
  }
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var class1 = 0;
  var class2 = 0;
  var myObj = new Object();

  _.forEach(data, function(student){
    class1 = student.grades.class1 + class1;
    class2 = student.grades.class2 + class2;
  })

  myObj["class1"]=class1/data.length;
  myObj["class2"]=class2/data.length;

  return myObj;

};
