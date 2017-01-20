"use strict";

describe("<Person> Class", function() {
  var peter = new Person("Peter Parker");
  
  describe("the name property", function() {
    it("should exist", function() {
      expect(peter.name).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(peter.name).toEqual(jasmine.any(String));
    });
    
    it("should reflect the name given during construction", function() {
      expect(peter.name).toBe("Peter Parker");
    });
  });
  
  describe("the getName method", function() {
    it("should exist", function() {
      expect(peter.getName).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(peter.getName()).toEqual(jasmine.any(String));
    });
    
    it("should reflect the name given during construction", function() {
      expect(peter.getName()).toBe("Peter Parker");
    });
  });
  
});

describe("<Student> Class (inherits from <Person>)", function() {
  var student = new Student("Bart Simpson", "Theater Arts", [1, 3]);
  
  describe("the name property", function() {
    it("should exist", function() {
      expect(student.name).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(student.name).toEqual(jasmine.any(String));
    });
    
    it("should reflect the name given during construction", function() {
      expect(student.name).toBe("Bart Simpson");
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
  
  describe("the getName method", function() {
    it("should exist", function() {
      expect(student.getName).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(student.getName()).toEqual(jasmine.any(String));
    });
    
    it("should reflect the name given during construction", function() {
      expect(student.getName()).toBe("Bart Simpson");
    });
  });
  
  describe("the `getIdentity` method", function() {
    it("should exist", function() {
      expect(student.getIdentity).toBeDefined();
    });
    
    it("should return a string", function() {
      console.log(student.getIdentity());
      expect(student.getIdentity()).toEqual(jasmine.any(String));
    });
    
    it("should reflect the name given in the beginning", function() {
      expect(student.getIdentity()).toBe("Student - Bart Simpson");
    });
  });

  
});
