"use strict";

 describe("allKeys(obj)", function() {

   var macBook = {
     ram: "8gb",
     processor: "i3",
     color: "Light Gray"
   }
   var macBookPro = {
     processor: "i5",
     color: "Space gray",
     extras: "touchBar"
   };
   macBookPro.__proto__ = macBook;

console.log(prototypes.allKeys(macBook))
   it("should return all the keys on an object, that doesn't inherit.", function() {
     expect(prototypes.allKeys(macBook)).toEqual(["ram", "processor", "color"]);
   });
   it("should return all the keys on an object. Including the parent's keys", function() {
     expect(prototypes.allKeys(macBookPro)).toEqual(["processor", "color", "extras", "ram"]);
   });

 });



  describe("keys(obj)", function() {

    var macBook = {
      ram: "8gb",
      processor: "i3",
      color: "Light Gray"
    }
    var macBookPro = {
      processor: "i5",
      color: "Space gray",
      extras: "touchBar"
    };
    macBookPro.__proto__ = macBook;

    it("should return all the keys on an object, that doesn't inherit.", function() {
      expect(prototypes.keys(macBookPro)).toEqual(["processor", "color", "extras"]);
    });
    it("should return all the keys on an object that has inheritance.", function() {
      expect(prototypes.keys(macBookPro)).toEqual(["processor", "color", "extras"]);
    });
  });

  describe("Array hasEqualContent", function() {

    it("[3, 2, 1].hasEqualContent([1, 2, 3])", function() {
      expect([3, 2, 1].hasEqualContent([1, 2, 3])).toBe(true);
    });
    it("[1, 2, 3].hasEqualContent([1, 2, 3]) -> [] true", function() {
      expect([1, 2, 3].hasEqualContent([1, 2, 3])).toBe(true);
    });
    it("[].hasEqualContent([]) -> true", function() {
      expect([].hasEqualContent([])).toBe(true);
    });
    it("[1, 3, 4].hasEqualContent([1, 3, 4, 5]) -> [] false", function() {
      expect([1, 3, 4].hasEqualContent([1, 3, 4, 5])).toBe(false);
    });
    it("[1, 2, 4].hasEqualContent([1, 3, 4]) -> [] false", function() {
      expect([1, 2, 4].hasEqualContent([1, 3, 4])).toBe(false);
    });

    // We want our is equal function to compare that 2 arrays contain the same things,
    // without necessarily having the same order.


    [3, 2, 1].hasEqualContent([1, 2, 3])
  })
