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
    var l = arr.length;
    var sumArr = arr.reduce(function(sum, value){
      return sum + value;
    }, 0)
    return l > 0 ? sumArr/l : 0;
}

// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes a Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA() -> 1.5
// ex. grades.getGPA([0, 0]) -> 0
//
// hint. use grades.average
grades.getGPA = function(student) {
  var sumGrades = student.grades.class1 + student.grades.class2;
  var avGrades = sumGrades/2;
  return avGrades;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var gpa = data.map(function(student){
    var sumGrades = student.grades.class1 + student.grades.class2;
    var avGrades = sumGrades/2;
    return avGrades;
  });

  var highest = gpa[0];
  var highestIndex = 0;

  for(var i = 0; i < gpa.length; i++){
    if(gpa[i] > highest){
      highest = gpa[i];
      highestIndex = i;
    }
  }

  return data[highestIndex];
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
  var groupMajor = _.groupBy(data, function(person) {
    return person.major;
  });
  var avMajor = [];
  var groupMajorsAv = _.mapObject(groupMajor, function(val, key){
    var studentGPA = [];
    for (var i = 0; i < val.length; i++){
      var gpa = (val[i].grades.class1 + val[i].grades.class2)/2;
      studentGPA.push(gpa);
    }

    var sum = 0;
    for(var i = 0; i < studentGPA.length; i++){
      sum += studentGPA[i];
    }

    return sum/studentGPA.length;
  });
  console.log("104");
  var f = [];
  _.forEach(groupMajorsAv, function(val, key){
    var r = [];
    r.push(key);
    r.push(val);
    f.push(r);
  });
//debugger;
  var index = 0;
  var highest = 0;
  for (var i = 0; i < f.length; i++){
    if (f[i][1] > highest){
      highest = f[i][1];
      index = i;
    }
  }
  return f[index][0];

};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys,
//`class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var c1 = [];
  var c2 = [];

  // iterate through the array

  data.forEach(function(student){
    c1.push(student.grades.class1);
    c2.push(student.grades.class2);
  });

    console.log(c1);
    console.log(c2);
  // get the avg of each array

  var classOneAvg = c1.reduce(function(a, b){
    return a + b;
  }, 0);

  var classTwoAvg = c2.reduce(function(a, b){
    return a + b;
  }, 0);

  classOneAvg /= data.length;
  classTwoAvg /= data.length;

  console.log(classOneAvg);
  console.log(classTwoAvg);
  var estudiante = {
  };
  estudiante.class1 = classOneAvg;
  estudiante.class2 = classTwoAvg;

  return estudiante;
};
