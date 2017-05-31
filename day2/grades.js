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
  var total = arr.reduce(function(a, b){
   return  a + b
 });
  return total / arr.length
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
  var arrGrades = [student.grades.class1, student.grades.class2];
  return grades.average(arrGrades)
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var highestGPA = 0;
  var bestStudentObject = {};
  for(var i = 0; i < data.length; i++){
    var currentGPA = grades.getGPA(data[i]);
    if(currentGPA > highestGPA){
      highestGPA = currentGPA;
      bestStudentObject = data[i]
    }

  }
  return bestStudentObject
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var groupedObjects = _.groupBy(data, function(i){
    if(i.major === 'Economics'){
      return 'Economics'
    }else if(i.major === 'Film Studies'){
      return 'Film Studies'
    }else if(i.major === 'Computer Science'){
      return 'Computer Science'
    }else if(i.major === 'Art History'){
      return 'Art History'
    }

  });
  console.log(groupedObjects);
//var grades = groupedObjects.economics.grades;
//console.log(grades)

var average = _.mapObject(groupedObjects, function(val, key){
var total = 0;
  for(var i = 0; i < val.length; i++){
    total = total + grades.getGPA(val[i])
  }
  return total / val.length
});
console.log(average)
//var keyValues = [];
var highestAverage = 0;
var hightestMajor = '';
  _.forEach(average, function(value, key){
    if(value > highestAverage){
    highestAverage = value;
    hightestMajor = key
  }

})
console.log(hightestMajor)
return hightestMajor

};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
var class1TotalGrades = [];
var class2TotalGrades = [];
//console.log(totalGrades)
for(var i = 0; i < data.length; i++){
  class1TotalGrades.push(data[i].grades.class1);
  class2TotalGrades.push(data[i].grades.class2);
}
//console.log(class2TotalGrades);
//console.log(class1TotalGrades);

var totalValClass1 = class1TotalGrades.reduce(function(a, b){
  return a + b
});
var class1Average = totalValClass1 / class1TotalGrades.length
console.log(class1Average);

var totalValClass2 = class2TotalGrades.reduce(function(a, b){
  return a + b
});
var class2Average = totalValClass2 / class2TotalGrades.length
console.log(class2Average);

return {'class1': class1Average,
'class2': class2Average,

}
/*
var class1 = {'class1': class1Average};
var class2 = {'class2': class2Average};

if(class2Average > class1Average){
console.log(class2)
  return class2
} else{
  console.log(class1)
  return class1
}*/
//console.log(totalValClass1);
//console.log(totalValClass2)


//console.log(class1TotalGrades);
  /*var groupedObjects = _.groupBy(data, function(i){
    if(i.major === 'Economics'){
      return 'Economics'
    }else if(i.major === 'Film Studies'){
      return 'Film Studies'
    }else if(i.major === 'Computer Science'){
      return 'Computer Science'
    }else if(i.major === 'Art History'){
      return 'Art History'
    }

  });*/
  // YOUR CODE HERE
};
