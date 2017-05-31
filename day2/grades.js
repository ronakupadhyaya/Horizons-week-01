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

  function sum(a,b){
    return a+b;
  }

if (arr.length>0) {
var total = arr.reduce(sum,0)
return total/arr.length
}

else {
  return 0
  }
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
  return ((student.grades.class1 + student.grades.class2)/2)
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPANum = function(data) {
  var x = []
  for (var i = 0; i<data.length; i++) {
    x.push(grades.getGPA(data[i]))
  }
  function max(a,b) {
    if (a<b) {
      return b
    }
    return a
  }
  var highestGrade = x.reduce(max)
  return highestGrade
}

grades.highestGPA = function(data) {
for (var i = 0; i<data.length; i++) {
  if (grades.getGPA(data[i]) === grades.highestGPANum(data)) {
    return data[i]
    }
  }
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.groupByMajor = function(data) {
  var x = _.groupBy(data, function(person) {
    return person.major;
  })
return x
}




grades.getGPAAvg = function(student) {
  var x =[]
  for (var i = 0; i < 4; i++) {
    for (var n = 0; n < array.length; i++) {
      array[i]
    }
  }
};




grades.majorWithHighestGPA = function(data) {

  var GPAs = []
  GPAs.push(grades.getGPAMajor(grades.groupByMajor(data)["Economics"]))
  GPAs.push(grades.getGPAMajor(grades.groupByMajor(data)["Art History"]))
  GPAs.push(grades.getGPAMajor(grades.groupByMajor(data)["Computer Science"]))
  GPAs.push(grades.getGPAMajor(grades.groupByMajor(data)["Film Studies"]))

  var highestGPA = (Math.max(GPAs[0],GPAs[1],GPAs[2],GPAs[3]))

  if (grades.getGPAMajor(grades.groupByMajor(data)["Art History"]) === highestGPA) {
    return "Art History"
  }

  if (grades.getGPAMajor(grades.groupByMajor(data)["Economics"]) === highestGPA) {
    return "Economics"
  }

  if (grades.getGPAMajor(grades.groupByMajor(data)["Computer Science"]) === highestGPA) {
    return "Computer Science"
  }

  if (grades.getGPAMajor(grades.groupByMajor(data)["Film Studies"]) === highestGPA) {
    return "Film Studies"
  }

};



grades.getGPAMajor = function(studentArray) {
  var x = []
  for (var i = 0; i < studentArray.length; i++) {
    x.push(grades.getGPA(studentArray[i]))
  }
//x.push(grades.getGPA[i])
  return grades.average(x)

};



// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
    var x = _.groupBy(data, function(person) {
      return person.grades.class1
    })
var numOfStudents = x["1"].length + x["2"].length + x["3"].length + x["4"].length
var a =(x["1"].length + 2*x["2"].length + 3*x["3"].length + 4*x["4"].length)/numOfStudents

  var y = _.groupBy(data, function(person) {
    return person.grades.class2
  })
  var numOfStudents = y["1"].length + y["2"].length + y["3"].length + y["4"].length
  var b =(y["1"].length + 2*y["2"].length + 3*y["3"].length + 4*y["4"].length)/numOfStudents

return {"class1": a, "class2": b}
};
