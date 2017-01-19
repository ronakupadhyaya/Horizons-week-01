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
  var x = _.reduce(arr, function(a,b) {
    return ((a+b));
  })
 return x/arr.length;
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
  var x = student.grades['class1']
  var y = student.grades['class2']
  return grades.average([x,y]);
  //access the object key using .grades
  //calculate the average of class1 and class 2 using grades.average

};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // x.push(getGPA(data))
  var sorted = data.sort(function(a,b) {
    return (grades.getGPA(a) - grades.getGPA(b))
  });
  return sorted[data.length-1];
}
// var x = _.reduce(data, function (a,b) {
//   if (a > b) {
//     return a
//   }
// })
// var high = {}
// high.push(x)
// return high;


// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var sorted = data.major.sort()

  }

//sort by alphabetical order major
//group by alphabetical order major
//take average gpa within those groups

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
var x = {"class1": 0, "class2": 0}
_.forEach(data, function (a) {
  x.class1 += a.grades.class1
  x.class2 += a.grades.class2
})

x.class1 = x.class1/data.length
x.class2 = x.class2/data.length

return x;
};

//loop through all of the data for class 1
//push all of those values into a new array
//find the average of the array

// var sum = 0;
// for (var i=0; i<array.length; i++) {
//   sum += data[i].grades.class1
//   }
// var avg1 = sum/data.length
// console.log(avg1)
//
// var sum2 = 0;
// for (var j=0; j<array.length; j++) {
//   sum2 += data[i].grades.class2
//   }
// var avg2 = sum2/data.length
// console.log(avg2)
// };
  //   var sorted = data.sort(function(a,b) {
  //        var accumulator = 0;
  //        for (var i = 0; i < array.length; i++) {
  //          accumulator += array[i];
  //        }
  //   return (grades.getGPA(a) - grades.getGPA(b))
  // });
  // return sorted[data.length-1];
  //
  // for (var i=0; i<data.length; i++)
  //
  // x.push(data.grades.class1)
  //run a loop to loop through all of class 1 and use an accumulator to find the sum
  //divide by the total length
