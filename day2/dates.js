"use strict";

window.dates = {};

// Exercise 1. dates.createDate(dateStr)
// Write a function that takes a properly-formatted date string and returns a JS Date Object from a properly formatted date string.
// ex. dates.createDate('May 17, 2016 9:00:00') -> Date(2016, 4, 17, 9, 0, 0, 0)
// ex. dates.createDate('2015-03-25') -> Date('2015-03-25')
// ex. dates.createDate('2015-03-25T12:00:00') -> Date('2015-03-25T12:00:00')
//
// hint. see http://www.w3schools.com/js/js_dates.asp
dates.createDate = function(dateStr) {
  // CHECK FOR WORD FORMAT
  if(typeof Number.parseInt(dateStr[0]) === 'number'){
    return new Date(dateStr);
  }

  // SPLITING THE WORD DATE FORMAT BY SPACES
  var arr = dateStr.split(" ");

  // Getting the hours, min, sec in proper format.
  var hoursMinSec = arr[3].split(":");
  var hours = Number.parseInt(hoursMinSec[0]);
  var min = Number.parseInt(hoursMinSec[0]);
  var sec = Number.parseInt(hoursMinSec[0]);

  // Taking off the comma
  var day = Integer.parseInt(arr[1].substring(0, arr[1].length - 1));

  // GETTING THE KEY VALUE PAIR FOR THE MONTH
  var month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(arr[0].slice(0, 3)) / 3 + 1;

  var year = Number.parseInt(arr[2]);

  return new Date(year, month, day, hours, min, sec);







};

// Exercise 2. dates.getUTCString(dateObj<Date>)
// Write a function that takes a Date Object and returns the UTC time string.
// ex. dates.getUTCString('May 17, 2016 9:00:00') -> Date(2016, 4, 17, 9, 0, 0, 0).toUTCString()
// ex. dates.getUTCString('2015-03-25') -> Date('2015-03-25').toUTCString()
// ex. dates.getUTCString('2015-03-25T12:00:00') -> Date('2015-03-25T12:00:00').toUTCString()
//
// note. UTC is kiiiinda like GMT - it's just another format of time
// hint. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
// hint. see http://www.w3schools.com/js/js_dates.asp
dates.getUTCString = function(dateObj) {
  return dateObj.toUTCString();
};

// Exercise 3.A dates.isSameDayOfWeek(dateObj<Date>, otherDateObj<Date>)
// Write a function that takes two Date Objects as arguments and returns true if both dates occur on the same day of the week (both on Tuesdays, etc.), false otherwise
// ex. dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-03-25')) -> true
// ex. dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-10-25')) -> true
// ex. dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-04-25')) -> false
//
// hint. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
dates.isSameDayOfWeek = function(dateObj, otherDateObj) {
  return dateObj.getDay() === otherDateObj.getDay();
};

// Exercise 3.B dates.isSameTimeOfDay(dateObj<Date>, otherDateObj<Date>)
// Write a function that takes two Date Objects as arguments and returns true if both dates occur on the same time of day (both at 3:03 AM, etc.), false otherwise
// ex. dates.isSameTimeOfDay(new Date('2015-03-25 02:00:00'), new Date('2015-03-25 02:00:00')) -> true
// ex. dates.isSameTimeOfDay(new Date('2015-03-25'), new Date('2015-10-25')) -> true
// ex. dates.isSameTimeOfDay(new Date('2015-03-25T12:00:00'), new Date('2015-03-25T16:00:00')) -> false
// ex. dates.isSameTimeOfDay(new Date('2015-12-11 03:00:00'), new Date('2015-12-11 03:00:00Z')) -> false
//
// hint. don't worry about milliseconds!
// hint. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours
dates.isSameTimeOfDay = function(dateObj, otherDateObj) {
  return dateObj.getHours() === otherDateObj.getHours();
};

// Exercise 3.C dates.isTheFuture(dateObj<Date>)
// Write a function that takes a Date object as an argument and returns true if it specifies a date in the future or false if it is a time that has already passed
//
// hint. how do you check if something is 'bigger than' something else?
dates.isTheFuture = function(dateObj) {
  // CONVERT THE DATE OBJECT TO SECONDS
  var dateObjTime = dateObj.getTime();
  return Date.now() < dateObjTime;
};

// Exercise 4. dates.incrementDay(dateObj<Date>)
// Write a function that takes a Date object and returns the Date object of the next day.
// ex. dates.incrementDay(new Date('May 17, 2016 9:00:00')) -> new Date('May 18, 2016 9:00:00')
//
// hint. don't worry about overflow!
// hint. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
dates.incrementDay = function(dateObj) {
  var newDateObj = new Date(dateObj.setDate(dateObj.getDate() + 1));

  return newDateObj;
};
