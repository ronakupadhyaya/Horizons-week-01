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

  var sum = function(a,b){
    return a + b;
  }
  if (arr.length > 0){
    return (arr.reduce(sum)/arr.length);
}
return 0;
}

// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes an Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA({"name": Holly...etc.}) -> 1.5
// ex. grades.getGPA
//
// hint. use grades.average
grades.getGPA = function(student) {

var gradeobject = _.values(student.grades)
return grades.average(gradeobject);
}


// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
var best = _.max(data, function(student){
  return grades.getGPA(student);
});
console.log(best);
return best;

}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {


var newobject = _.groupBy(data, function(student){
  return student.major
  // return grades.getGPA()
});

var new1 = _.mapObject(newobject, function(students, major){
  var gpaOfStudents = _.map(students, grades.getGPA)
  return grades.average(gpaOfStudents);
});

var bestmajor = Object.keys(new1).reduce(function(a,b){
  return new1[a] > new1[b] ? a : b;

})
return bestmajor;
};





// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // how to group by classes
// var new1 = _.mapObject(data, function(students, major)

var ourObject = { class1: [], class2: []};
// console.log(ourObject);

//classes is the object and class1 is the key
// mapobject the object to get averages


data.forEach(function returnClasses(student){
  ourObject.class1.push(student.grades.class1)
  ourObject.class2.push(student.grades.class2)
});

var answer = _.mapObject(ourObject, function(values){
  return grades.average(values)
})
return answer;

}

//   var justClasses = _.groupBy(data, function(student){
//     return student.grades
//   });
// // console.log(justClasses);
// }

// var new2 = _.mapObject(data, function(students, grades){
//   var classes = _.map(classes, grades.average)
//   return grades.average(classes);
// });

//   var classGrades = _.groupBy(data, function(student){
//     return student.class
//     // return grades.getGPA()
//   });
//   console.log(newobject);
// };
//
// var new2 = _.mapObject(newobject, function(students, grades){
//   var gpaOfClasses = _.map(students, grades.getGPA)
//   return grades.average(gpaOfStudents);
// });
