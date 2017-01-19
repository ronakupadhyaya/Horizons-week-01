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
  if (arr.length === 0 ) {
    return 0;
  }
  var grades = arr.length;
  var total = 0;
  var sum =  function(x, y) {
    return (x + y);
  }
  return arr.reduce(sum)/grades;
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
  var length = 0;
  var sum = 0;
  _.forEach(student.grades, function(value){
    sum = sum + parseInt(value);
    length++;
  })
  return sum/length;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var highest = 0;
  var highestname = {};
  _.forEach(data, function(value){

   if( highest < grades.getGPA(value)) {
      highestname = value;
      return highest = grades.getGPA(value);

   }
  })

 return highestname;
};

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var highest = 0;
  var average = 0;
  var majorobj = [];
  var majorarray = [];
  var highestmajor = "";
  var highestGPA = 0;
  _.forEach(data, function(value){
    var major = value.major
    majorobj = [];
    majorarray = [];
  _.forEach(data, function(value1){
   if(value.major === value1.major){
      majorobj.push(value1)
    }
 })
  //majorarray into an arry
  _.forEach(majorobj, function(value2){

   majorarray.push(grades.getGPA(value2));

 })

 var majorgpa = grades.average(majorarray);
  
  if(highestGPA < majorgpa){
    highestGPA = majorgpa;
    highestmajor = major;
  }
})
return highestmajor;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var classgpa1 = [];
  var classgpa2 = [];

  _.forEach(data, function(stuff){
    
    _.forEach(stuff, function(key, value){
      if(stuff.key == 'class1'){
        classgpa1.push(value);
      }else {
        classgpa2.push(value);
      }


   })
  })
  var obj = {};
  obj.class1 = grades.average(classgpa1);
  obj.class2 = grades.average(classgpa2);


};



// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var c1 = 0;
  var c2 = 0;

  _.forEach(data, function(student) {
    c1 += student.grades.class1;
    c2 += student.grades.class2;
  });

  c1 = c1 / data.length;
  c2 = c2 / data.length;

  return { "class1" : c1, "class2" : c2 };
};