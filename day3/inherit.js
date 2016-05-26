"use strict";

// In this segment, you'll be creating more class(es) to become familiar with OOP.
// You've learned how to create a class, define its properties and methods, and now you're going to learn how to build on top of your own classes to augment and add functionality. 

// Exercise 1. `Person` Class
// Create a `Person` Class according to the class specification in `model.png`.
// Define one property on the class, `name`.
// Also, define a *getter* (a method that get a value), getName() that return the `name` of the instance.

// TODO: put your `Person` class code over here!
// Constructor & Properties

var Person = function(name, age) {
  this.name = name;
};

// Method declarations

Person.prototype.getName = function() {
  return this.name;
};

// Exercise 2. (Sub) Class constructor for `Student`

// Write a constructor for the `Student` class that *inherits* from the `Person` Class.
// The contructor for `Student` should take three arguments, just like before - `name`, `major` and `grades`.
// note. "Inheritance" will allow the `Student` class to get all the properties and methods defined on the `Person` class while also allowing you to overload them.  This allows you to re-use code implemented elsewhere and provides a good way to  separate your logic.
// 
// ex.
// 
// hint. the syntax for defining a class that inherits from another (sometimes called a *sub-class* or *child-class*) is as such:
// 
// (`Fruit` is the parent class)
//  var Fruit = function(color) {
//    this.color = color;
//  };
// 
// Fruit.prototype.getColor = funtion() {
//  return this.color;
// };
// 
//  var Banana = function() {
//    Fruit.call(this, 'yellow');
//  };
// 
// Banana.prototype.constructor = Banana; // this is critical to make the Banana its own man
// 
// Now, the strength (and beauty) of doing something like this is that you can now do:
// var b = new Banana();
// b.getColor() -> 'yellow'
// 
// Even though getColor was not defined in the `Banana` class, it was defined on the `Fruit` class, which `Banana` inherits from, which it can then use.

// TODO: put your constructor for student right here

var Student = function(name, major, grades) {
  Person.call(this, name);
  
  this.major = major;
  this.grades = grades;
};

// Exercise 3. (Overloading) Method definitions
// Write a `getName` method for the `Student` class. If you've been following along, you might be wondering why you're doing this - I just told you it would already be defined because `Student` inherits from `Person`.
// However, in this case, we're going to be *overloading* the method, and extending the functionality. We'll be adding a 'Student' designation to the return value.
// 
// ex.
//  var bart = new Student("Bart Simpson", "Tomfoolery", [0, -1]);
//  bart.getName() -> "Student - Bart Simpson";
// 
// hint. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript

Student.prototype.getName = function() {
  return ("Student - " + Person.call(this).getName());
};
