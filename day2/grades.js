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
    return 0
  }


  var result = 0
  for(var i = 0; i < arr.length; i++){
    result += arr[i]
  }

  return result / arr.length
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
  var grade1 = student.grades.class1
  var grade2 = student.grades.class2
  return grades.average([grade1,grade2])
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  data.forEach(function(student){
    student.gpa = grades.getGPA(student);
  })
  data.sort(function(studentA,studentB) {
    if (studentA.gpa > studentB.gpa) {
      return -1
    }
    return 1
  })
  return data[0]
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
  // YOUR CODE HERE
  data.forEach(function(student){
    student.gpa = grades.getGPA(student);
  })
  var majors = _.groupBy(data, function(person){
    return person.major
  })

  var majorGpa = _.mapObject(majors, function(studentList, major){
    var gpaSum = 0
    for(var i = 0; i < studentList.length; i++){
      gpaSum += studentList[i].gpa
    }
    return gpaSum / studentList.length
  })
  var hi = _.pairs(majorGpa)

  hi.sort(function(majorA, majorB){
    if(majorA[1] > majorB[1]){
      return -1
    }

    return 1
  })

  return hi[0][0]
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that
// correspond to the average GPA of the students taking that class. It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var class1 = []
  var class2 = []
  for(var i = 0; i < data.length; i++){
    class1.push(data[i].grades.class1)
    class2.push(data[i].grades.class2)
  }
  var sum1 = 0
  var sum2 = 0

  for(var i = 0; i < class1.length; i++){
    sum1 += class1[i]
  }

  var result1 = sum1 / class1.length

  for(var j = 0; j < class2.length; j++){
    sum2 += class2[j]
  }

  var result2 = sum2 / class2.length

  return {'class1' : result1, 'class2' : result2}






};
