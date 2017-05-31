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
  var months = {'Jan':0, 'Feb':1, 'Mar':2, 'Apr':3, 'May':4, 'Jun':5, 'Jul':6, 'Aug':7, 'Sep': 8, 'Oct': 9, 'Nov':10, 'Dec':11};
  var dates = dateStr.split(' ');
  if (dates.length === 1){
    var d = new Date(dates[0]);
    return d;
  }
  else{

    var time = dates.pop();
    var split = time.split(":");

    var date = dates.concat(split);
    var year = parseInt(date[2]);
    var month = months[dates[0]];
    var day = parseInt(date[1]);
    var hours = parseInt(date[3]);
    var minutes =parseInt(date[4]);
    var seconds = parseInt(date[5]);
    var milliseconds = 0;
    var v = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    return v;

  }
  console.log(dates);
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
  return dateObj.getDay()===otherDateObj.getDay();
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
  return dateObj.getHours()===otherDateObj.getHours() && dateObj.getMinutes()===otherDateObj.getMinutes() && dateObj.getSeconds()===otherDateObj.getSeconds();
};

// Exercise 3.C dates.isTheFuture(dateObj<Date>)
// Write a function that takes a Date object as an argument and returns true if it specifies a date in the future or false if it is a time that has already passed
//
// hint. how do you check if something is 'bigger than' something else?
dates.isTheFuture = function(dateObj) {
  var n = Date.now();
  return dateObj.getTime() > n;
};

// Exercise 4. dates.incrementDay(dateObj<Date>)
// Write a function that takes a Date object and returns the Date object of the next day.
// ex. dates.incrementDay(new Date('May 17, 2016 9:00:00')) -> new Date('May 18, 2016 9:00:00')
//
// hint. don't worry about overflow!
// hint. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
dates.incrementDay = function(dateObj) {
  var day = dateObj.getDate();
  day++;
  dateObj.setDate(day);
  return dateObj;
};
