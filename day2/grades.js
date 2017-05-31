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
  var arrLength = arr.length
  var summ = function (a,b){
    return a+b
  }
  var total = 0
  total = _.reduce(arr,summ)
  if(arrLength>0){
    return total/arrLength
  }else{
    return 0;
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
  var classes = ['class1', 'class2']
  var newArray = []
  for (var i=0; i<classes.length; i++){
    newArray.push(student['grades'][classes[i]]);
  }
  return grades.average(newArray);
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  var max = 0
  var studentIndex=0
  for(var i=0; i<data.length;i++){
    if(grades.getGPA(data[i])>max){
      max = grades.getGPA(data[i])
      studentIndex=i
    }
  }
  return data[studentIndex];
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  var major= function(student){
    return student['major'];
  }
  var majorGroups= _.groupBy(data, major);

  var keyArray = _.keys(majorGroups)
  var max = 0
  var whatmajor = ''

  for(var i=0;i<keyArray.length;i++){
    var student_gpa_in_major = []
    for (var j=0;j<majorGroups[keyArray[i]].length;j++){
      var curr_student_gpa = grades.getGPA(majorGroups[keyArray[i]][j]);
      student_gpa_in_major.push(curr_student_gpa);
    }
    var average_gpa_in_major = grades.average(student_gpa_in_major);
    if (average_gpa_in_major > max){
      max = average_gpa_in_major;
      whatmajor = keyArray[i];
    }
  }
  return whatmajor;

}

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  var class1array=[]
  var class2array=[]

  for(var i=0;i<data.length;i++){
    class1array.push(data[i]['grades']['class1'])
    class2array.push(data[i]['grades']['class2'])
  }
  var class1avg= grades.average(class1array)
  var class2avg= grades.average(class2array)

  var newObj={
    'class1': class1avg,
    'class2': class2avg
  }
  return newObj;

};
