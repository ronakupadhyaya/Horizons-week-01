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
  if (arr.length === 0){
    return 0;
  }

  var num = arr.length;
  var sum = _.reduce(arr, function(a,b){
    return a + b;
  });
  return sum/num;
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
  return grades.average([student.grades.class1, student.grades.class2]);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var highest = 0;
  var stu = {};
  for (var i=0; i<data.length; i++) {
    var gpa = grades.getGPA(data[i]);
    if (gpa > highest){
      highest = gpa;
      stu = data[i];
    }
  }

  return stu;


}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
//   // YOUR CODE HERE
  var groupByMajor = _.groupBy(data, function(student){
    return student.major
  });

  //use _.map to return [each student's gpa], then an object with value of average grades(gpa) of the array
  var gpa = _.mapObject(groupByMajor, function(val, key) {
    var gradesInMajor = _.map(val, function(stu) {
      return grades.getGPA(stu);
    })
    return grades.average(gradesInMajor);
  })

  var maxKey = "";
  var maxGPA = 0;

  for (var key in gpa){
    if (gpa[key] > maxGPA) {
      maxGPA = gpa[key];
      maxKey = key;
    }
  }
  return maxKey;
};




//   var majorObj = _.groupBy(data, function(student){
//     return student.major
//   });
//   var majorSum = 0
//   var currentMajor
//   _.each(majorObj, function(value, key){
//     for(var i=0; i<value.length; i++){
//       majorSum = majorSum + grades.getGPA(value[i])
//       currentMajor = value[i].major;
//     }
//
//     var majorGPA = majorSum / value.length
//     console.log("major GPA is: " + majorGPA);
//     console.log("current Major:" + currentMajor);
//
//     var highestGPA = 0;
//     if (majorGPA > highestGPA){
//       console.log("in if")
//       highestGPA = majorGPA;
//       var highestMajor = currentMajor;
//       console.log("current Major: " );
//     }
//
//   })
//   return highestMajor;
// };



// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and
// returns an object with two keys, `class1` and `class2`,
// with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var class1Arr = _.map(data, function(student){
    return student.grades.class1;
  });
  var class2Arr = _.map(data, function(student){
    return student.grades.class2;
  });
  console.log(class1Arr);

  var class1Ave = grades.average(class1Arr);
  var class2Ave = grades.average(class2Arr);

  var avgObj = {'class1': class1Ave, 'class2': class2Ave};
  return avgObj;

};
