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
  if(arr.length === 0){
    return 0;
  }
  var average = 0;
  for(var i = 0; i < arr.length; i++){
    average += arr[i];
  }
  return average/arr.length;
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
  var gradesArray = [];
  gradesArray.push(student.grades["class1"], student.grades["class2"]);
  return grades.average(gradesArray);

};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var highestGPA = 0;
  var bestStudent = {};
  var grades123 = [];
  for(var i = 0; i < data.length; i++){
    if(grades.getGPA(data[i]) > highestGPA){
      highestGPA = grades.getGPA(data[i])
      bestStudent = data[i];
    }
  }

  return bestStudent;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var obj = {};
  obj = _.groupBy(data, function(student){
    return student.major
  })

  var keys = [];
  _.forEach(obj, function(value, key, obj){
    return keys.push(key);
  })

  var majorGPA = 0;
  var highestGPA = 0;
  var bestMajor = "";

  for (var j = 0; j < 4; j++){
    majorGPA = 0;
    for (var i = 0; i < obj[keys[j]].length; i++){
      majorGPA += grades.getGPA(obj[keys[j]][i]);
    }
    majorGPA = majorGPA /obj[keys[j]].length;

    if (majorGPA>highestGPA) {
      highestGPA = majorGPA;
      bestMajor = keys[j];
    }
  }
  return bestMajor;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var class1Grades = [];
  var class2Grades = [];
  for(var i = 0; i < data.length; i++){
    class1Grades.push(data[i].grades.class1);
    class2Grades.push(data[i].grades.class2);
  }
  var class1GradesAverage = grades.average(class1Grades);
  var class2GradesAverage = grades.average(class2Grades);
  return {"class1": class1GradesAverage, "class2": class2GradesAverage};
};
