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
  if(arr.length === 0 ) return 0;
  var ave=  _.reduce(arr, function(x,y){
    return x + y;
  })
  return ave / arr.length;
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
 return grades.average([student.grades.class1,student.grades.class2]);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {

 for(var i=0;i<data.length; i++){
   data[i].GPA = grades.getGPA(data[i]);
 }
 return _.reduce(data,function(x,y){
   return x.GPA > y.GPA ? x : y;
 });
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  for(var i=0;i<data.length; i++){
    data[i].GPA = grades.getGPA(data[i]);
  }
  var Majors =  _.groupBy(data, function(student) {
    return student.major;
  });

  var gpaAverage=[];

  for(var key in Majors){
    var array = [];
    array.push(key);

    var sum = _.reduce(Majors[key], function(a,b){
      console.log(a + " " + b);
      return a + b.GPA;
    }, Majors[key][0].GPA);

    sum /= Majors[key].length;
    // var sum = 0;
    // _.forEach(Majors[key], function(val) {
    //   sum += val.GPA;
    // });
    // sum /= Majors[key].length;

    array.push(sum);
    gpaAverage.push(array);
  }

  console.log(gpaAverage);

  return  _.max(gpaAverage,function(i){
    return i[1];
  })[0];
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {

  var returnObject = {'class1': 0, 'class2':0};
  var class1 = [];
  var class2 = [];
  for(var i=0; i<data.length; i++){
    class1.push(data[i].grades.class1)
  }
  for(var i=0; i<data.length; i++){
    class2.push(data[i].grades.class2)
  }
  returnObject.class1= _.reduce(class1,function(x,y){
      return (x+y);
  });
  returnObject.class1 = (returnObject.class1/class1.length)
  returnObject.class2= _.reduce(class2,function(x,y){
    return (x+y);
  });
  returnObject.class2 = (returnObject.class2/class2.length)
  return returnObject;
};
