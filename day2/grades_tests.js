"use strict";

describe("grades.average(arr)", function() {
  it("should return a number", function() {
    expect(grades.average([0, 2, 3, -1])).toEqual(jasmine.any(Number));
  });
  
  it("should return 0 with an empty array", function() {
    expect(grades.average([])).toBe(0);
  });
  
  it("should return 4/3 for [1, 2, 1]", function() {
    expect(grades.average([1, 2, 1])).toEqual(4/3);
  });
  
  it("should return -7/3 for [-12, 9, -4]", function() {
    expect(grades.average([-12, 9, -4])).toEqual(-7/3);
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
    expect(names.indexOf(grades.highestGPA(studentData))).not.toBe(-1);

  });
  
  it("should say the student with the highest GPA is either Scott or Jane", function() {
    var names = ["Scott", "Jane"];
    expect(names.indexOf(grades.highestGPA(studentData))).not.toBe(-1);
    
  });

});

describe("grades.majorWithHighestGPA(thing)", function() {
  it("should return a string", function() {
    expect(grades.majorWithHighestGPA(studentData)).toEqual(jasmine.any(String));
  });
  
  it("should correspond to an existing major", function() {
    var majors = studentData.map(function(student) {
      return student.major;
    });    
    expect(majors.indexOf(grades.majorWithHighestGPA(studentData))).not.toBe(-1);

  });
  
  it("should say the major with the highest GPA is either Economics or Film Studies", function() {
    var majors = ["Economics", "Film Studies"];
    expect(majors.indexOf(grades.majorWithHighestGPA(studentData))).not.toBe(-1);
    
  });

});

describe("grades.avgGPAPerClass(thing)", function() {
  it("should return an object", function() {
    expect(grades.avgGPAPerClass(studentData)).toEqual(jasmine.any(Object));
  });
  
  it("should have two keys, `class1` and `class2`", function() {
    expect(grades.avgGPAPerClass(studentData).class1).toBeDefined();
    expect(grades.avgGPAPerClass(studentData).class2).toBeDefined();
  });
  
  it("should be around 2.488 and 2.644 for class1 and class2 respectively", function() {
    expect(grades.avgGPAPerClass(studentData).class1).toBe(112 / 45);
    expect(grades.avgGPAPerClass(studentData).class2).toBe(119 / 45);
  });

});
