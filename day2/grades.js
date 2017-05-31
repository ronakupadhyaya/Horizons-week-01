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
  var result = _.reduce(arr,function(grade1,grade2){
    return grade1+grade2;
  },0);
  var avg = result/arr.length;
  //console.log(avg);
  return avg || 0;
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
  var gradeArray = [];
  _.each(student.grades,function(value,key){
    gradeArray.push(value);
  })
  return grades.average(gradeArray);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var gpas = [];
  _.each(data,function(student){
    var s = {
      name: student.name,
      gpa: grades.getGPA(student)
    }
    gpas.push(s);
  });
  var max = _.reduce(gpas,function(student1,student2){
    if(student1.gpa > student2.gpa){
      return student1;
    }
    return student2;
  },{name: '', gpa: 0});
  return max;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // console.log(data);
  // var majorGPAs = {
  //   "Economics": 0,
  //   "Art History": 0,
  //   "Film Studies": 0,
  //   "Computer Science": 0
  // };
  //
  var majorGPAs = [];
  var majors = _.groupBy(data, function(student) {
    return student.major;
  });

  //for each major
  _.each(majors,function(students,majorName){
    //console.log(major,students);
    var gpas = [];
    //for each student in this major add all student GPAS
    _.each(students,function(student){
      gpas.push(grades.getGPA(student));
    })
    var majorObject = {major: majorName, gpa: grades.average(gpas)};
    majorGPAs.push(majorObject);

  });
  //get major with max GPA
  var maxGPAMajor = _.reduce(majorGPAs,function(major1,major2){
    console.log(major1, major2);
    if(major1.gpa > major2.gpa){
      return major1;
    }
    return major2;
  },{ major: '', gpa: 0});
  //console.log(maxGPAMajor);
  return maxGPAMajor.major;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {

  var class1Grades =[];
  var class2Grades = [];
  _.each(data, function(student){
    class1Grades.push(student.grades['class1']);
    class2Grades.push(student.grades['class2']);
  })

  var class1GPA = grades.average(class1Grades);
  var class2GPA = grades.average(class2Grades);
  return {'class1': class1GPA, 'class2': class2GPA};
};
