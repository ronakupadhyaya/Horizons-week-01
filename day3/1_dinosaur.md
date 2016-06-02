# Dinosaur Game

## Preface

You guys have been making some pretty complicated things these past few days, so let's do something fun today!

There's no doubt that you've experienced how terrible the wi-fi connection can get at Horizons HQ, and quite a few of you are greeted with the "no w-fi" dinosaur in Chrome. Did you know that it's also a mini-game? If you didn't, try it out now: turn off your wi-fi radio and try navigating to a web-page in chrome.

You should see a dinosaur, and if you press the `SPACE` key, you'll end up starting the game.

<img src="http://d0od.wpengine.netdna-cdn.com/wp-content/uploads/2015/06/chrome-dinosaur-game.png"/>

_(You can go ahead and play through that for a bit)_

So, what's the exercise for today, you ask?

You're gonna be building that very game!

Well, sort of. We're going to show you how to apply the skills you've learned thus far to create a simple game similar to the No-Wifi Dinosaur adventure. At the end of it, it will probably look a little something like this:

<img src="new_dino.png" />

The **goal** of this game will to be avoid hitting the obstacle that comes for you.

--- 

### `CanvasWrapper`

To make the game, we're providing you with a class to make interacting with HTML `canvas` elements easier (that way you won't have to know too much to use it!). It's called `CanvasWrapper,` and you can find it in `dino_game.js`. `Canvas` is an HTML element used for displaying graphics in the browser. 

There are only a few methods implemented but they make your life a lot easier:

##### `CanvasWrapper.prototype.attachTo(canvasId<String>)`

This method takes a string representing the ID of a canvas element present in the DOM. It then fetches the 'context' of the canvas, which allows to draw on it. This part will be done for you, so you don't have to worry about it to much.

##### `CanvasWrapper.prototype.clear()`

This method resets the canvas. The Canvas Element works like a real canvas - once you've painted something, it will stay there. That feature is annoying if you're building a game and want to move things around - the old image will stay where you drew it last, and so you see a 'lagging' sort of effect.

Kind of like this:

<img src="http://i.imgur.com/1VFZwvx.png"/>

So, when you want to move objects, you have to clear the canvas before you do, otherwise it's Windows 95 all over again.

##### `CanvasWrapper.prototype.drawDinosaur(x<Number>, y<Number>)`

This method draws the `Dinosaur` object to the screen. Really, it's just an orange-redish (coral?) rectangle, but it's the thought that counts. It will draw a rectangle at point (x, y), with the given arguments being the bottom right vertex of the `Dinosaur` rectangle.

##### `CanvasWrapper.prototype.drawObstacle(x<Number>, y<Number>)`

This method draws an `Obstacle` object to the screen, much like `.drawDinosaur`. However, the obstacle is instead drawn from its bottom-left corner, rather than the bottom-right, like `Dinosaur`.

#### Usage

You can use CanvasWrapper like this:

```javascript

// Instantiating a new CanvasWrapper object
var width = 1768;
var height = 60;
var canvasId = 'some-canvas'
var cw = new CanvasWrapper(width, height, 'some-canvas');
// this line creates a new CanvasWrapper object, giving it control of a canvas with an id equal to `some-canvas`, and sets the width and height of it.

// drawing
cw.drawDinosaur(200, 75);
// this line draws a dinosaur from point (200, 75)
// NOTE: the canvas coordinate system is a bit strange. Positive y values are actually negative, which means (200, 75) would be in Quadrant IV of the cartesian coordinate system.

// clearing the canvas
cw.clear()
// Alright, you should have a 


```

---

## Dino Thunder

Alright, now we can get started! The first thing you're going to be doing is implement a `Dinosaur` class to contain the state and a few useful methods. Then you'll build `Obstacle` classes to make the game interesting! Finally, you'll build a `Game` Object to tie everything together.

## 1. Implementing Dinosaur

First off, you're going to be creating the `Dinosaur` object! Up until now, you've been implementing things we've designed for you. However, now you have the freedom to make your own design choices. What kind of properties should our `Dinosaur` object have? Methods? Here are things we know for sure:

+ We want to track the `position` of the `Dinosaur`, so that we can draw it and determine if an obstacle has hit it
+ We want to write a `jump` mechanism so that the `Dinosaur` position changes vertically when that function is called

- simple getter/setters
- collisions
- jumping
- simple event loop

## 2. Implementing Obstacles

+ continuous movement
+ bounding

## 3. Implementing the Game Object

+ a better event loop
+ 

# Resources
