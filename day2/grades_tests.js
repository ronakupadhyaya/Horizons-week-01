"use strict";

describe("grades.summation(arr)", function() {
  it("should return a number", function() {
    expect(grades.summation([0, 2, 3, -1])).toEqual(jasmine.any(Number));
  });
  
  it("should return 0 with an empty array", function() {
    expect(grades.summation([])).toBe(0);
  });
  
  it("should return 4 for [1, 2, 1]", function() {
    expect(grades.summation([1, 2, 1])).toBe(4);
  });
  
  it("should return -7 for [-12, 9, -4]", function() {
    expect(grades.summation([-12, 9, -4])).toBe(-7);
  });
});

describe("grades.highestGPA(thing)", function() {
  it("should return a string", function() {
    expect(grades.highestGPA(studentData)).toEqual(jasmine.any(String));
  });
  
  it("should correspond to a student in the class", function() {
    var names = studentData.map(function(student) {
      return student.name;
    });
    
  //   expect(names.indexOf(grades.highestGPA(studentData))).not.toBe(-1);
  //   
  // });
  
  it("should be TODO", function() {
    // TODO:
  });

});
