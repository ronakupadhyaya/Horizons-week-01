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
  if(arr.length === 0) {
    return 0;
  }

  var sum = function(a, b){
    return a + b;
  }

  var numGrades = arr.length;
  var avg = _.reduce(arr, sum) / numGrades;
  return avg;
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
  return (student.grades.class1 + student.grades.class2) / 2
};



// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var max = data[0];
  for(var student of data){
    if(grades.getGPA(student) > grades.getGPA(max)){
      max = student;
    }
  }
  return max;
}

// Function: extracts a lists of GPAs for a group of students
grades.extractGpaList = function(studentsObj){
  var studentGradeList = [];
  for(var student of studentsObj){
    studentGradeList.push(grades.getGPA(student));
  }
  return studentGradeList;
}
// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var majorGroupObj = _.groupBy(data, function(student){
    return student.major;
  });

  var avgOfMajors = _.mapObject(majorGroupObj, function(major){
    return grades.average(grades.extractGpaList(major));
  });

  var majors = Object.keys(avgOfMajors)

  var highest = majors[0];
  for(var major of majors){
    if(avgOfMajors[major] > avgOfMajors[highest]){
      //console.log(major, highest);
      highest = major;
    }
  }
  return highest;



};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average
// GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var class1Grades = [];
  var class2Grades = [];

  for(var student of data){
    class1Grades.push(student.grades.class1);
    class2Grades.push(student.grades.class2);
    }

  var class1Avg = grades.average(class1Grades);
  var class2Avg = grades.average(class2Grades);

  return {'class1': class1Avg,
            'class2' :  class2Avg}
};
