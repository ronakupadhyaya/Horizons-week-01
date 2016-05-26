"use strict";

describe("<Student> Class", function() {
  // beforeAll(function() {
    var student = new Student("Reginald", [1, 3] , "Theater Arts");
  // });
  
  describe("the name property", function() {
    it("should exist", function() {
      expect(student.name).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(student.name).toEqual(jasmine.any(String));
    });
    
    it("should reflect the name given during construction", function() {
      expect(student.name).toBe("Reginald");
    });
  });
  
  describe("the grades property", function() {
    it("should have a exist", function() {
      expect(student.grades).toBeDefined();
    });
    
    it("should be an array", function() {
      expect(student.grades).toEqual(jasmine.any(Array));
    });
    
    it("should reflect the grades given during construction", function() {
      expect(student.grades).toEqual([1, 3]);
    });
  });
  
  describe("the major property", function() {
    it("should exist", function() {
      expect(student.major).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(student.major).toEqual(jasmine.any(String));
    });
    
    it("should reflect the major given during construction", function() {
      expect(student.major).toBe("Theater Arts");
    });
  });
  
  describe("the `getGPA` method", function() {
    it("should exist", function() {
      expect(student.getGPA).toBeDefined();
    });
    
    it("should return a number", function() {
      expect(student.getGPA()).toEqual(jasmine.any(Number));
    });
    
    it("should properly calculate the GPA", function() {
      expect(student.getGPA()).toBe(2);
    });
  });

  
});
