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
  var sum = _.reduce(arr, function(a, b) {
    return a + b;
  });
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
  var array = [student.grades.class1, student.grades.class2];
  var gpa = grades.average(array);
  return gpa;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  return _.reduce(data, function(student1, student2) {
    var grade1 = grades.getGPA(student1);
    var grade2 = grades.getGPA(student2);
    if (grade1 > grade2) {
      return student1;
    }
    return student2;
  });
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
  debugger;
  var groupedStudents = _.groupBy(data, function(student) {
    return student.major;
  });

  var classGPA = function(data) {
    var gpaArray = _.map(data, function(student) {
      return grades.getGPA(student);
    });
    return grades.average(gpaArray);
  };

  var avgGPAMajors = _.mapObject(groupedStudents, function(students, major) {
    return classGPA(students);
  });
  var majorGPAList = [];
  //major object { major: 'Major', avgGPA: 4}
  for (var key in avgGPAMajors) {
    majorGPAList.push( { major: key,
                        avgGPA: avgGPAMajors[key]} );
  }
  var winningMajor = _.reduce(majorGPAList, function(major1, major2) {
    if (major1.avgGPA > major2.avgGPA) {
      return major1;
    }
    return major2;
  });

  return winningMajor.major;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  debugger;
  var class1Grades = [];
  var class2Grades = [];
  var grabGrades = function(stu) {
    class1Grades.push(stu.grades.class1);
    class2Grades.push(stu.grades.class2);
  }
  _.forEach(data, grabGrades);

  return { 'class1': grades.average(class1Grades), 'class2': grades.average(class2Grades)};
};
