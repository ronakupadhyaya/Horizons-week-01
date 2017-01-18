# Pair Programming Exercise: Prototypes

## Goal

In this exercises we are going to work with prototypes. You can think of a prototype
as a link from the current object to another object that may contain more information.
In this case we are going to build software for an computer store. To begin, we'll
have a default basic macBook that most people will buy.

```javascript
var macBook = {
  ram: "8gb",
  processor: "i3",
  color: "Light Gray"
}

console.log(macBook) // -> { ram: '8gb', processor: 'i3' }
```

Awesome, now we are going to need a macBookPro model that has a better processor
and comes in "Space gray". Instead of duplicating all the properties, we only set
the old ones and set up a link to search for the ones that are already on the standard
macBook.

```javascript
var macBookPro = {
  processor: "i5",
  color: "Space gray"
}
```

Right now the macBookPro will only have 2 properties

```javascript
console.log(macBookPro) // -> { processor: 'i5', color: 'Space gray' }
console.log(macBookPro.ram); // Searching for ram on macBookPro will be undefined.
```

We add the link from macBook to macBookPro by setting the prototype (__proto__)
```javascript
macBookPro.__proto__ = macBook;
```

Logging macBookPro will still give us the same results as it hasn't been changed. It's properties remain the same.
```javascript
console.log(macBookPro) // -> { processor: 'i5', color: 'Space gray' }
```

But now, accessing macBookPro.ram actually finds the default ram. And looking for
color (that is in both objects), will return the correct color for the macBookPro.

```javascript
console.log(macBookPro.ram);
console.log(macBookPro.color);
```

You can even make a chain of objects that contain more and more properties!

```javascript
var touchBarMacbook = {
  extras: "touchBar"
};

Object.setPrototypeOf(touchBarMacbook, macBookPro);
console.log(macBookPro.ram);
console.log(touchBarMacbook.extras);
```

So, how does all of this work?
Looking for a property in JS takes a couple of steps:
1. It will check for "own" properties of an object.These are the properties that
are declared within an object,
    and that appear when you console.log() that object
    For example:
    console.log(touchBarMacbook); // { extras: 'touchBar' }
    Doing     
    console.log(touchBarMacbook.extras) will look for the property in touchBarMacbook, find it and return it.

But what happens if it doesn't find the property on the object?

2. It will follow the __proto__ link to the next object and find it there. "Color" is an not "own" property of touchBarMacbook,
    but it is an "own" property of macBookPro!
    For example:
    console.log(touchBarMacbook.color); // -> "Space gray"

What happens if it still doesn't find it on macBookPro like in the case of console.log(touchBarMacbook)?
3. It will continue looking through the prototypes of objects (that make up a chain) until it finds them.
    For example:
    console.log(touchBarMacbook.ram); // -> "Space gray"
    Will look for 'ram' on touchBarMacbook. It won't find it as it is not an "own" property of touchBarMacbook.
    It will follow the __proto__ one level up to -> macBookPro.
    Will look for 'ram' on macBookPro. It won't find it as it is not an "own" property of macBookPro.
    It will follow the __proto__ one level up to -> macBook.
    Will look for 'ram' on macBook. It will find it as an "own" property of macBook and return it.
    -> "8gb" success!


## Instructions

1. Open `week01/day2/prototypes.js` in your text editor. Exercise details are listed there.
1. Open `week01/day2/prototypes.html` in your browser to run tests.
1. Write necessary functions to make all the tests pass.
