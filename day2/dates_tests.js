// "use strict";

describe("dates.createDate(dateStr)", function() {
  it("should return date objects", function() {
    expect(dates.createDate('2015-03-25T12:00:00')).toEqual(jasmine.any(Date));
  });
  
  it("should create dates from properly-formmatted date strings", function() {
    expect(dates.createDate('May 17, 2016 9:00:00')).toEqual(new Date(2016, 4, 17, 9, 0, 0, 0));
    
    expect(dates.createDate('2015-03-25')).toEqual(new Date('2015-03-25'));
    
    expect(dates.createDate('2015-03-25T12:00:00')).toEqual(new Date('2015-03-25T12:00:00'));
  });
});

describe("dates.getUTCString(d, c)", function() {
  it("should return a string", function() {
    expect(dates.getUTCString(new Date('2015-03-25T12:00:00'))).toEqual(jasmine.any(String));
  });
  
  it("should create date strings from properly-formmatted input dates strings", function() {
    expect(dates.getUTCString(new Date('May 17, 2016 9:00:00'))).toEqual(new Date(2016, 4, 17, 9, 0, 0, 0).toUTCString());
    
    expect(dates.getUTCString(new Date('2015-03-25'))).toEqual(new Date('2015-03-25').toUTCString());
    
    expect(dates.getUTCString(new Date('2015-03-25T12:00:00'))).toEqual(new Date('2015-03-25T12:00:00').toUTCString());
  });
});

describe("dates.isSameDayOfWeek(d, c)", function() {
  it("should return a boolean", function() {
    expect(dates.isSameDayOfWeek(new Date('2015-03-25T12:00:00'), new Date('2015-03-25T12:00:00'))).toEqual(jasmine.any(Boolean));
  });
  
  it("should return true for dates that occur on the same day of the week", function() {
    expect(dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-03-25'))).toBe(true);
    
    expect(dates.isSameDayOfWeek(new Date('2015-03-21'), new Date('2015-03-28'))).toBe(true);
  });
  
  it("should return false for dates that occur on a different day of the week", function() {
    expect(dates.isSameDayOfWeek(new Date('2015-03-25'), new Date('2015-04-25'))).toBe(false);
  });
});

describe("dates.isSameTimeOfDay(d, c)", function() {
  it("should return a boolean", function() {
    expect(dates.isSameTimeOfDay(new Date('2015-03-25T12:00:00'), new Date('2015-03-25T12:00:00'))).toEqual(jasmine.any(Boolean));
  });
  
  it("should return true for dates that occur on the same time of day", function() {
    expect(dates.isSameTimeOfDay(new Date('2015-03-25T12:00:00'), new Date('2015-03-25T12:00:00'))).toBe(true);
    
    expect(dates.isSameTimeOfDay(new Date('2015-03-21T12:00:00'), new Date('2015-03-25T12:00:00'))).toBe(true);
  });
  
  it("should return false for dates that occur on a different time of day", function() {
    expect(dates.isSameTimeOfDay(new Date('2015-03-25T12:00:00'), new Date('2015-03-25T16:00:00'))).toBe(false);
    
    expect(dates.isSameTimeOfDay(new Date('2015-03-25T12:00:00'), new Date('2015-02-26T16:00:00'))).toBe(false);
  });
});

describe("dates.isTheFuture(d)", function() {
  it("should return a boolean", function() {
    expect(dates.isTheFuture(new Date('2015-03-25T12:00:00'))).toEqual(jasmine.any(Boolean));
  });
  
  it("should create date strings from properly-formmatted input dates strings", function() {
    expect(dates.isTheFuture(new Date('May 17, 2016 9:00:00'))).toBe(false);
    
    expect(dates.isTheFuture(new Date('2016-06-25'))).toBe(true);
    
    expect(dates.isTheFuture(new Date())).toBe(false);
  });
});

describe("dates.incrementDay(d)", function() {
  it("should return strings", function() {
    expect(dates.getUTCString(new Date('2015-03-25T12:00:00'))).toEqual(jasmine.any(String));
  });
  
  it("should create date strings from properly-formmatted input dates strings", function() {
    expect(dates.getUTCString(new Date('May 17, 2016 9:00:00'))).toEqual(new Date(2016, 4, 17, 9, 0, 0, 0).toUTCString());
  });
});