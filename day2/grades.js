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
  if (arr.length === 0) {
  	return 0;
  }

  var len = arr.length;
  return _.reduce(arr, function(a, b){
  	return a + b;
  }) / len;
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
	var arr = [student.grades.class1, student.grades.class2];
	//console.log(student);
	//console.log(grades.average(student.grades));
	return (grades.average(arr));
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  //var arr = [];
  var stu = data[0];
  _.forEach(data, function(student) {
  	//console.log(student.getGPA();
  	if (grades.getGPA(student) > grades.getGPA(stu)) 
  		stu = student;
  })
  //console.log(stu);
  return stu;
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
 var organized = _.groupBy(data, function(student) {
    return student.major;

 });
 // console.log(organized);

 
   for (var i = 0; i < Object.values(organized).length; i ++) {
   		var students = Object.values(organized)[i];
   		for (var j = 0; j < students.length; j++) {
   			students[j] = grades.getGPA(students[j]);
   		}
   };
   //console.log(organized);

   	var organized2 = _.map(organized, function(values, keys) {
   		//console.log(values);
    	return [keys, grades.average(values)];
    })

   //console.log(organized2);

  
   var result = _.reduce(organized2, function(acc, val) {
   		 if (val[1] > acc[1])
   		 	return val;
   		 return acc;
   });
  
  return result[0];  
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // var grades = _.map(data, function(student) {
  // 	return [student.grades.class1, student.grades.class2];
  // })

  // var result = _.reduce(grades, function(a, b) {
  // 	return [(a[0]+b[0]), (a[1]+b[1])];
  // })

  // var result2 = new Object();
  // result2.class1 = result[0]/data.length;
  // result2.class2 = result[1]/data.length;

  // return result2;

  sumClass1 = 0;
  sumClass2 = 0;
  console.log(sumClass1);
  /*
  for (var i = 0; i<data.length; i++){
      sumClass1 += data[i].grades.class1;
      sumClass2 += data[i].grades.class2;
  }
  // console.log(sumClass1);
  avgClass1 = sumClass1/data.length;
  avgClass2 = sumClass2/data.length;
  console.log("hello");

  // var j = {‘class1’: avgClass1, ‘class2’: avgClass2};
  // return j;
};
