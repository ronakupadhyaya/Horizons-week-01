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
  if(arr.length ===0)
    return 0;

  var total = _.reduce(arr,function(a,b){
    return a+b;
  });
  return total/(arr.length);
};

// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes an Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA() -> 1.5
// ex. grades.getGPA([0, 0]) -> 0
//
// hint. use grades.average

grades.values = function(object) {
  // YOUR CODE HERE
  var array = [];
  _.forEach(object, function(value){
    array.push(value);
  })
  return array;
}

grades.getGPA = function(student) {
  // YOUR CODE HERE
  return grades.average(grades.values(student.grades));
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var maxGPA = -1;
  var maxIdx = -1;

  _.forEach(data,function(stu, index){
    if(grades.getGPA(stu) > maxGPA){
      maxGPA = grades.getGPA(stu);
      maxIdx = index;
    }
  });
  return data[maxIdx];
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
  var majorObj = _.groupBy(data, function(stu) {
    return stu.major;
  });
  // console.log(majorObj);

  var gpaObj =_.mapObject(majorObj, function(stu_arr, key){
    return _.map(stu_arr, grades.getGPA);
  })
  // console.log(gpaObj);

  var finalObj = _.mapObject(gpaObj, function(gpa_arr, key){
    return grades.average(gpa_arr);
  })

  // console.log(finalObj);

  var maxGPA = -1;
  var maxKey = '';

  _.forEach(finalObj,function(value, key){
    if(value > maxGPA){
      maxGPA = value;
      maxKey = key;
    }
  });
  return maxKey;

};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
  var classArr = [];
  _.forEach(data,function(item,index){
    classArr.push(item.grades);
  })
  console.log(classArr);

  var count_class1 = 0;
  var count_class2 = 0;

  _.forEach(classArr, function(item, index){
    count_class1 += item.class1;
    count_class2 += item.class2;
  })
  var avg_class1 = count_class1/classArr.length;
  var avg_class2 = count_class2/classArr.length;

  return {class1:avg_class1, class2:avg_class2};


};
