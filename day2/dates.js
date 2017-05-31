"use strict";

window.dates = {};

window.datesEnum = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
}
// Exercise 1. dates.createDate(dateStr)
// Write a function that takes a properly-formatted date string and returns a JS Date Object from a properly formatted date string.
// ex. dates.createDate('May 17, 2016 9:00:00') -> Date(2016, 4, 17, 9, 0, 0, 0)
// ex. dates.createDate('2015-03-25') -> Date('2015-03-25')
// ex. dates.createDate('2015-03-25T12:00:00') -> Date('2015-03-25T12:00:00')
//
// hint. see http://www.w3schools.com/js/js_dates.asp
dates.createDate = function(dateStr) {
  var date = dateStr.split(" ");
  var month;

  if(window.datesEnum.hasOwnProperty(date[0])){
    month = window.datesEnum[date[0]];
  } else {
    return new Date(dateStr);
  }

  var day = parseInt(date[1].substring(0,date[1].length-1));
  var year = parseInt(date[2]);

  var times = date[3].split(':');
  var hour = parseInt(times[0]);
  var minute = parseInt(times[1]);
  var second = parseInt(times[2]);
  var milliseconds = parseInt(times[3]) || 0;

  return new Date(year, month, day, hour, minute, second, milliseconds);
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
  var first = dateObj.getDay();
  var second = otherDateObj.getDay();

  if(first === second){
    return true;
  }

  return false;

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
  if(dateObj.getHours() === otherDateObj.getHours()){
    if(dateObj.getMinutes() === otherDateObj.getMinutes()){
      if(dateObj.getSeconds() === otherDateObj.getSeconds()){
        return true;
      }
    }
  }
  return false;
};

// Exercise 3.C dates.isTheFuture(dateObj<Date>)
// Write a function that takes a Date object as an argument and returns true if it specifies a date in the future or false if it is a time that has already passed
//
// hint. how do you check if something is 'bigger than' something else?
dates.isTheFuture = function(dateObj) {
  var cur = new Date().getTime();
  var ob = dateObj.getTime();

  if(ob > cur){
    return true;
  }

  return false;
};

// Exercise 4. dates.incrementDay(dateObj<Date>)
// Write a function that takes a Date object and returns the Date object of the next day.
// ex. dates.incrementDay(new Date('May 17, 2016 9:00:00')) -> new Date('May 18, 2016 9:00:00')
//
// hint. don't worry about overflow!
// hint. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
dates.incrementDay = function(dateObj) {
  var date = new Date(dateObj.setDate(dateObj.getDate() + 1));
  return date;
};
