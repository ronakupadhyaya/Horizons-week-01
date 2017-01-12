"use strict";

describe("Deep Array Copy", function() {
  it("copyToolbox.deepArrayCopy([0, 1, 2, 3]) -> [0, 1, 2, 3]", function() {
    expect( copyToolbox.deepArrayCopy([0, 1, 2, 3]) ).toEqual([0, 1, 2, 3]);
  });
  it("copyToolbox.deepArrayCopy([1, 2, [4, 1]])) -> [1, 2, [4, 1]])", function() {
    expect( copyToolbox.deepArrayCopy([1, 2, [4, 1]])).toEqual([1, 2, [4, 1]]);
  });
  it("copyToolbox.deepArrayCopy([[[1]]]) -> [[[1]]]", function() {
    expect( copyToolbox.deepArrayCopy([[[1]]]) ).toEqual([[[1]]]);
  });
  it("Sub-arrays also being copied (modifying a copy doesnt modify the original)", function() {
    var a = [1, 2, [4, 1]];
    var b = copyToolbox.deepArrayCopy(a);
    b[0] = 0;
    b[2][0] = 0;
    expect(a).toEqual([1, 2, [4, 1]]);
  });
});

describe("Deep Object Copy", function() {
  beforeEach(function(){
    var personA = {
      name: "Ethan",
      title: "instructor",
      school: {
        name: "horizons",
        address: "3879 23rd street, San Francisco, California 94114"
      }
    }
  })
  it("copyToolbox.deepObjectCopy(personA) -> copy contains same names+values", function() {
  var personA = {
      ethan: "sebastian",
      title: "instructor"
    }
    expect( copyToolbox.deepObjectCopy(personA)).toEqual(personA);
  });
  it("copyToolbox.deepObjectCopy(personA) -> The copy should contain a copy of the original's nested objects", function() {
    expect( copyToolbox.deepObjectCopy(personA) ).toEqual(personA);
  });
  it("Modyfing a sub-object on the copy should't modify the original", function() {
    var personB = copyToolbox.deepObjectCopy(personA)
    personB.school.name = "some random school";
    expect(personA.school.name).toEqual("horizons");
  });
  it("Sub-objects on copies are not the same as on the original", function() {
    var personB = copyToolbox.deepObjectCopy(personA)
    expect(personA.school).not.toBe(personB.school);
  });

});
