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

  if (arr.length === 0) {
    return 0;
  };

  var sum = _.reduce(arr, function(a, b) {
    return a + b;
  });
  //console.log(sum);
  return sum / arr.length;
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
  return (student.grades.class1 + student.grades.class2) / 2;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var highestGPA = 0;
  var bestStudent = 0;
  var objectOfGrades = _.mapObject(data, grades.getGPA);

  for (var key in objectOfGrades) {
    if (objectOfGrades[key] > highestGPA) {
      highestGPA = objectOfGrades[key];
      bestStudent = key;
    }
  }
  return data[bestStudent];
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var MajorGPAs = _.groupBy(data, "major");

  //console.log(MajorGPAs);

  var gpaMajorSum = [];

  _.mapObject(MajorGPAs, function(value, key){
    var accumulator = 0;
    var avgGpa = 0;
    _.mapObject(MajorGPAs[key], function(value2, key2) {
      accumulator += MajorGPAs[key][key2].grades.class1 + MajorGPAs[key][key2].grades.class2;
    });
    var avgGpa = accumulator / (2 * MajorGPAs[key].length);
    gpaMajorSum.push([key, avgGpa]);
  });

  // for (var major in MajorGPAs) {
  //   var accumulator = 0;
  //   var avgGpa = 0;
  //   for (var i = 0; i < MajorGPAs[major].length; i++) {
  //     accumulator += MajorGPAs[major][i].grades.class1;
  //     accumulator += MajorGPAs[major][i].grades.class2;
  //   }
  //   var avgGpa = accumulator / (2 * MajorGPAs[major].length);
  //   gpaMajorSum.push([major, avgGpa]);
  //   //console.log(gpaMajorSum);
  // }
  //console.log(gpaMajorSum);

  var high = 0;
  var bestMajor = "";

  for(var i = 0; i < gpaMajorSum.length; i++) {
    if (gpaMajorSum[i][1] > high) {
      high = gpaMajorSum[i][1];
      bestMajor = gpaMajorSum[i][0];
    }
  }
  return bestMajor;
}
//
//
//   _.mapObject(gpaByMajorObject, function(value, key) {
//     value = _.mapObject(student, function(student) {
//       return grades.getGPA(student);
//     });
//     return grades.avg(value);
//   });
// }
// //
//   for (var key in objectOfGrades) {
//     if (objectOfGrades[key] > highestGPA) {
//       highestGPA = objectOfGrades[key];
//       bestStudent = key;
//     }
//   }
//   return data[bestStudent][major];
// };

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var gpa1 = 0;
  var gpa2 = 0;

  _.forEach(data, function(student) {
    gpa1 += student.grades.class1;
    gpa2 += student.grades.class2;
  })
  var avg1 = gpa1 / data.length;
  var avg2 = gpa2 / data.length;

  return {'class1': avg1, 'class2': avg2};
};
