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
  var sum = function(a,b) {
    return a + b;
  }
  if(arr.length === 0){
    return 0;
  }
  return arr.reduce(sum)/arr.length;

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
  var average = grades.average([student.grades.class1, student.grades.class2]);
  return average;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // var maxValue = function(a,b) {
  //   return MathMax(a,b);
  // data.reduce(maxValue, 0)
  // var maxGPA = data.reduce(maxValue, 0)
  //
  // var findMaxGPA = _.mapObject(returnObject, function(val, key)
  return _.reduce(data, function(a,b){
    var gpa1 = grades.getGPA(a);
    var gpa2 = grades.getGPA(b);
    return gpa1 < gpa2 ? b : a;
  });
}


// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {

  var majors = {
    "Art History": [0, 0 , 0 ], //total gpa score, number of students, average GPA
    "Economics": [0, 0 , 0 ],
    "Film Studies": [0, 0 , 0 ],
    "Computer Science": [0, 0 , 0 ]
  }

  data.forEach(function(student) {
    //console.log(student);
    //console.log(student.major);

    if (student.major === "Art History") {
      majors["Art History"][0] += grades.getGPA(student);
      majors["Art History"][1]++;
      //console.log(majors["Art History"][1]);
    } else if (student.major === "Economics") {
      majors["Economics"][0] += grades.getGPA(student);
      majors["Economics"][1]++;
      //console.log(majors["Economics"][1]);
    } else if (student.major === "Film Studies") {
      majors["Film Studies"][0] += grades.getGPA(student);
      majors["Film Studies"][1]++;
      //console.log(majors["Film Studies"][0]);
    } else if (student.major === "Computer Science") {
      majors["Computer Science"][0] += grades.getGPA(student);
      majors["Computer Science"][1]++;
      //console.log(majors["Computer Science"][1]);
    }
  });

  majors["Art History"][2] = majors["Art History"][0]/ majors["Art History"][1];
  majors["Economics"][2] = majors["Economics"][0]/ majors["Economics"][1];
  majors["Film Studies"][2] = majors["Film Studies"][0]/ majors["Film Studies"][1];
  majors["Computer Science"][2] = majors["Computer Science"][0]/ majors["Computer Science"][1];
  // console.log("Art history is " + majors["Art History"][2]);
  // console.log(majors["Economics"][2]);
  // console.log(majors["Film Studies"][2]);
  // console.log(majors["Computer Science"][2]);
  var max = 0;
  var maxMajor;
  for (var key in majors) {
    if (majors[key][2] > max) {
      max = majors[key][2];
      maxMajor = key;
    }
  }
  return maxMajor;
};

//   data.forEach(function(student){
//     console.log(student);
//   //   if(student.major === "Art History") {
//   //     console.log(student.major);
//   //     arttotal[0] += data[i].grades.getGPA();
//   //     arttotal[1] ++;
//   //   } else if (data[i].major === "Economics") {
//   //     econtotal[0] += data[i].grades.getGPA();
//   //     econtotal[1] ++;
//   //   }
//   // });
//   }
// }

  // var majorFinder = function(student){
  //   //console.log("student majors are ", student.major);
  //   return student.major;
  // }
  //
  // var groupOfMajors = _.groupBy(data, majorFinder);
  // console.log("groupOfMajors", groupOfMajors);
  //
  // //maps of groupOfMajors object and finds each student object's GPA
  // var groupOfMajorsGPA = _.mapObject(groupOfMajors, getStudentGPAs )
  // console.log("groupOfMajorsGPA", groupOfMajorsGPA);
  //
  // //maps over array of student objects and calculates GPA
  // var getStudentGPAs = function (arrayOfStudents) {
  //   arrayOfStudents.mapOf(grades.getGPA);
  // }


// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {

  var classScores = {
    "class1": [0, 0 , 0 ], //total gpa score, number of students, average GPA
    "class2": [0, 0 , 0 ]
  }

  data.forEach(function(student) {
    //console.log(student);
    //console.log(student.major);
    classScores["class1"][0] += student.grades.class1;
    classScores["class1"][1]++
    //console.log(majors["Art History"][1]);
    classScores["class2"][0] += student.grades.class2;
    classScores["class2"][1]++
  });

  classScores["class1"][2] = classScores["class1"][0]/ classScores["class1"][1];
  classScores["class2"][2] = classScores["class2"][0]/ classScores["class2"][1];

  //console.log(classScores);
  // console.log("Art history is " + majors["Art History"][2]);
  // console.log(majors["Economics"][2]);
  // console.log(majors["Film Studies"][2]);
  // console.log(majors["Computer Science"][2]);
  var returnObject = {
    "class1": classScores.class1[2],
    "class2": classScores["class2"][2]
  };
  return returnObject;
};
