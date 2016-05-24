"use strict";

window.dates = {};

// Exercise 1. dates.createDate(dateStr)
// Write a function that takes a properly-formmatted date string and returns a JS Date Object from a properly formatted date string.
// ex. dates.createDate('May 17, 2016 9:00:00') -> Date(2016, 4, 17, 9, 0, 0, 0)
// ex. dates.createDate('2015-03-25') -> Date('2015-03-25')
// ex. dates.createDate('2015-03-25T12:00:00') -> Date('2015-03-25T12:00:00')
//
// hint. see http://www.w3schools.com/js/js_dates.asp
dates.createDate = function(dateStr) {
  // YOUR CODE HERE
};

// Exercise 2. dates.getUTCString(d<Date>)
// Write a function that takes a Date Object and returns the UTC time string.
// ex. dates.getUTCString('May 17, 2016 9:00:00') -> Date(2016, 4, 17, 9, 0, 0, 0).toUTCString()
// ex. dates.getUTCString('2015-03-25') -> Date('2015-03-25').toUTCString()
// ex. dates.getUTCString('2015-03-25T12:00:00') -> Date('2015-03-25T12:00:00').toUTCString()
//
// hint. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
// hint. see http://www.w3schools.com/js/js_dates.asp
dates.getUTCString = function(d) {
  // YOUR CODE HERE
};

// Exercise 3.A dates.isSameDayOfWeek(d<Date>, c<Date>)
// Write a function that takes two Date Objects as arguments and returns true if both dates occur on the same day of the week (both on Tuesdays, etc.), false otherwise
// ex. dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-03-25')) -> true
// ex. dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-10-25')) -> true
// ex. dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-04-25')) -> false
//
// hint. see http://www.w3schools.com/js/js_dates.asp
dates.isSameDayOfWeek = function(d, c) {
  // YOUR CODE HERE
};

// Exercise 3.B dates.isSameTimeOfDay(d<Date>, c<Date>)
// Write a function that takes two Date Objects as arguments and returns true if both dates occur on the same time of day (both at 3:03 AM, etc.), false otherwise
// ex. dates.isSameDayOfWeek(new Date('2015-03-25 02:00:00'), new Date('2015-03-25 02:00:00')) -> true
// ex. dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-10-25')) -> true
// ex. dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-04-25')) -> false
// 
// hint. see http://www.w3schools.com/js/js_dates.asp
dates.isSameTimeOfDay = function(d, c) {
  // YOUR CODE HERE
};

// Exercise 3.C dates.isTheFuture(d<Date>)
// Write a function that takes a Date object as an argument and returns true if it specifies a date in the future or false if it is a time that has already passed
// 
// hint. see Date.now() and parseInt
// hint. see http://www.w3schools.com/js/js_dates.asp
dates.isTheFuture = function(d) {
  // YOUR CODE HERE
};

// Exercise 4. dates.incrementDay(d<Date>)
// Write a function that takes a Date Object and treturns the UTC time string.
// ex. dates.incrementDay() -> false
// 
// hint. don't worry about overflow!
// hint. see 'getDate' and 'setDate'
// hint. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
dates.incrementDay = function(d) {
  // YOUR CODE HERE
};
