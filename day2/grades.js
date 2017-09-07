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
  if (arr.length === 0) {
    return 0;
  } else {
    var sum = function(x,y) {
      return x+y;
  }
  return ((arr.reduce(sum))/(arr.length));
};
}


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
  return grades.average([student.grades.class1, student.grades.class2])
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var highest = 0;
  var studentGPA = null;

  _.forEach(data, function(student) {
    var gpa = grades.getGPA(student);
    if (highest < gpa) {
      highest = gpa
      studentGPA = student
    }

  });
  return studentGPA;
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
  //group students by major, get average GPA, get GPA of the student
 //debugger;
 //Object of arrays of objects
 //group students by major, get average GPA, get GPA of the student
   debugger;
   //Object of arrays of objects
   var groupbyMajor = _.groupBy(data, function(student) {
     return student.major;
   });
   //debugger;

  var highestGPA = _.mapObject(groupbyMajor, function(val,key){
     var sumGPA = 0;
     var c1 = 0;
     var c2 = 0;
     for (var i = 0; i < val.length; i++){
       c1 += val[i].grades["class1"];
       c2 += val[i].grades["class2"];
       sumGPA += (c1 + c2)/2 ;
     }
     return sumGPA/val.length;
   });

 var  emptyArray= [];
 _.forEach(highestGPA, function(val,key){
   var temp = [];
   temp.push(key);
   temp.push(val);
   emptyArray.push(temp);
 })

 var index = 0;
 var highest = 0;
 for(var j = 0; j < emptyArray.length; j++){
   if(emptyArray[j][1] > highest){
     highest = emptyArray[j][1];
     index = j
   }
 }
   return emptyArray[index][0];
 //return _.mapObject(groupbyMajor,function(val,key){return ()

 // create highest variable/
 // loop through highestGPA
//return _.mapObject(groupbyMajor,function(val,key){return ()

// create highest variable/
// loop through highestGPA

};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  //
  _.forEach(data, function(student) {

  })
};
