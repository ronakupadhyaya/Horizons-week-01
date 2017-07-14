Immediately Invoked Function Expressions (IIFEs)
function func1() {
    console.log("hello")
  }()
  (function func2() {
    return "hello"
  })()
iifes just run the definition immediately

quirks:
- when u do p = 11 and not var p = 11 it will create a variable on the window like window.p = 11
- window is the global object, its the big object that contains all the objects
- to declare a variable you write var
- function myFunc() {
  var x = 7;
  var y = 9;
  return x;
}
console.log(x); -----will be a reference error bc the function wasn't called but also
variables inside functions not available at global scope #1 so the x won't be console
logged and you'll still get a reference Error
- Scope - a name given to the set of variables available, the variables you can see
- in order to figure out what variables you can see, figure out what the scope rules are for
global and local variables
SCOPE:
- To understand what the value of a variable is requires two ideas
- function based scope rules:
1. global scope (variables available everywhere)
2. local scope (variables available according to closure rules) variable capture (closures)
- The engine goes thru 2 passes, they first pass through the code to check for variables that
are defined and then the second pass it runs the code. so if you declare a var after the func is called then
the var will be declared but it wont be assigned to a value

-for closures: when you have outer func and inner func, all the variables in outer func including the parameters
are all captured, those variables are accessible and captured

-type of null is object
-when using call, if you don't have a value for keyvalue pair, then put down null

- prototypes: We add the link from macBook to macBookPro by setting __proto__.

macBookPro.__proto__ = macBook;


what is variable hoisting??


NOTES THURSDAY DAY 4
- always just read documentation on MDN and then go to stack overflow
- if you do returns you get automatic semicolons
- always use semicolons no mater what, and especially use returns
- put semicolons after IIFEs

(function() {
  function getAnimal() {
    return "lion"
  }
  window.lion = getAnimal()
}()); **** put a semicolon here!

(function() {
  function getAnimal() {
    return "tiger"
  }
  window.tiger = getAnimal()
}())

- array equal content !== object equal content
- [1, 2, 3] === [1, 2, 3] NO IT DOES NOT equal
arrays and objects can never equal each other like that !!! because they are checking
references !
- we care about ie11 because ?
- we didnt teach spread because ?
- .bind returns a new function, any args u pass thru it permanently get fixed,
once u do a bind it's bound for the return function of the object and YOU CAN'T
CHANGE IT ANYMORE
- .call calls a new function
-.bind has to do it in order, u can make it go every other in order if you pass it
a non-string with a symbol that does this
- new! keyword when applied to a function adds a new object and returns the object with the parameters inside
the object
- things from the same constructor share and that is called a prototype

var func = array.prototype.slice;
array.prototype.slice = array.prototype.
array.prototype.splice = func

asynchronous code doesnt run line after line, sometimes it can run not like this

- callback is just a function, it's the thing that calls back after it happens
the closer u are to the system, the more accurate you can be but the less english
your code becomes and more difficult it is to code
- if u wanna set multiple timers, you just pass the string

callback - a fuction you write but someone else invokes


when u wnt something to do it more than once, do set interval

- you can't push into a string, you can only push into an array
- you can use array.prototype.join('') to turn an array into a string






-human centered design-
1. start with empathy: be in the shoes of them (interviews, observe, data)
2. define: what is the problem we're solving and what can you do ?
3. ideate (brainstorming, be really positive, YES and YES and YES)
    how do i get college kids to use my app? (start a club)
    get crazy ideas out there without judgement
    once you ideate,
4. prototype it AND THEN
    do a minimal viable product, what's the smallest amount i can spend?
5. test the idea
   DONT PRIME THEM TO DO ANYTHING, JUST GIVE IT TO STRANGERS AND SEE WHAT
   HAPPPENS
6. talk to QUINN


6/19/16
- at least u must have a doctype and <html> tag
- you can only have 1 parent
- html is the ultimate parent
- h1 is largest heading, and it goes down from there
- to put in an <img src="https://horizons-static.s3.amazonaws.com/moose.jpeg" alt=""> alt="Picture of Moose"
- using the alt tag increases readability
- target="_blank" takes u to a new webpage
- you can add multiple classes to an element by just using a space
- id is different than class bc each id is unique
- a given elem can't have more than 1 id
- we mostly use classes
- div is a generic elem type, creates a container to apply properties to
- use inline-block to share a line
- u can use .c, .d to make it apply to both
- testimonal img {} the space means look inside testimonial and make that image a certain measurement value


HTML SELECTORS: DINER
- Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.
ex: div selects <div> and p selects <p>
- <div> <p> and <ul> are different element types

- #cool selects any element with id="cool"
- ul#long selects ul id="long"

- descendant selector: A B
Select an element inside another element. Selects all B inside of A.
p  strong selects all strong elements that are inside of any p
#fancy  span selects any span elements that are inside of the element with id="fancy"

- Combine the Descendant & ID Selectors: You can combine any selector with the descendent selector.
#id  A
#cool span selects all span elements that are inside of elements with id="cool"

Class Selector: Select elements by their class .classname
The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.
.neato selects all elements with class="neato"

- Combine the Class Selector: A.className
You can combine the class selector with other selectors, like the type selector.
ul.important selects all ul elements that have class="important"
#big.wide selects all elements with id="big" that also have class="wide"

- Comma Combinator: Combine, selectors, with... commas! A, B
this selects all A and B elements. You can combine any selectors this way, and you can specify more than two.
p, .fun selects all p elements as well as all elements with class="fun"
a, p, div selects all a, p and div elements

- The Universal Selector: You can select everything! *
You can select all elements with the universal selector!
p * selects any element inside all p element

- Combine the Universal Selector: A  *
This selects all elements inside of A.
p * selects every element inside all p elements.
ul.fancy * selects every element inside all ul class="fancy" elements.

- Adjacent Sibling Selector: Select an element that directly follows another element A + B
This selects all B elements that directly follow A. Elements that follow one another are called siblings.
Theyre on the same level, or depth.
In the HTML markup for this level, elements that have the same indentation are siblings.
p + .intro selects every element with class="intro" that directly follows a p
div + a selects every a element that directly follows a div

- General Sibling Selector: Select elements that follows another element A ~ B
You can select all siblings of an element that follow it.
This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.
A ~ B selects all B that follow a A

- Child Selector: Select direct children of an element A > B
You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element.
Elements that are nested deeper than that are called descendant elements.
A > B selects all B that are a direct children A

- First Child Pseudo-selector
Select a first child element inside of another element
:first-child
You can select the first child element. A child element is any element that is directly nested in another element.
You can combine this pseudo-selector with other selectors.
:first-child selects all first child elements.
p:first-child selects all first child p elements.
div p:first-child selects all first child p elements that are in a div.

- Only Child Pseudo-selector
Select an element that are the only element inside of another one.
:only-child
You can select any element that is the only element inside of another one.
span:only-child selects the span elements that are the only child of some other element.
ul li:only-child selects the only li element that are in a ul.

-Last Child Pseudo-selector
Select the last element inside of another element :last-child
You can use this selector to select an element that is the last child element inside of another element.
Pro Tip → In cases where there is only one element, that element counts as the first-child, only-child and last-child!
:last-child selects all last-child elements.
span:last-child selects all last-child span elements.
ul li:last-child selects the last li elements inside of any ul.

-Nth Child Pseudo-selector
Select an element by its order in another element
:nth-child(A)
Selects the nth (Ex: 1st, 3rd, 12th etc.) child element in another element.
:nth-child(8) selects every element that is the 8th child of another element.
div p:nth-child(2) selects the second p in every div

-Nth Last Child Selector
Select an element by its order in another element, counting from the back :nth-last-child(A)
Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!
:nth-last-child(2) selects all second-to-last child elements.

-First of Type Selector
Select the first element of a specific type :first-of-type
Selects the first element of that type within another element.
span:first-of-type selects the first span in any element.

-Nth of Type Selector
:nth-of-type(A)
Selects a specific element based on its type and order in another element - or even or odd instances of that element.
div:nth-of-type(2) selects the second instance of a div.
.example:nth-of-type(odd) selects all odd instances of a the example class.

-Nth-of-type Selector with Formula
:nth-of-type(An+B)
The nth-of-type formula selects every nth element, starting the count at a specific instance of that element.
span:nth-of-type(6n+2) selects every 6th instance of a span, starting from (and including) the second instance.

-Only of Type Selector
Select elements that are the only ones of their type within of their parent element
:only-of-type
Selects the only element of its type within another element.
p span:only-of-type selects a span within any p if it is the only span in there.

-Last of Type Selector
Select the last element of a specific type
:last-of-type
Selects each last element of that type within another element. Remember type refers the kind of tag, so p and span are different types.
I wonder if this is how the last dinosaur was selected before it went extinct.
div:last-of-type selects the last div in every element.
p span:last-of-type selects the last span in every p.

-Empty Selector
Select elements that don't have children
:empty
Selects elements that don't have any other elements inside of them.
div:empty selects all empty div elements.

-Negation Pseudo-class
Select all elements that dont match the negation selector
:not(X)
You can use this to select all elements that do not match selector "X".
:not(#fancy) selects all elements that do not have id="fancy".
div:not(:first-child) selects every div that is not a first child.
:not(.big, .medium) selects all elements that do not have class="big" or class="medium".

-Attribute Selector
Select all elements that have a specific attribute
[attribute]
Attributes appear inside the opening tag of an element, like this: span attribute="value". An attribute does not always have a value, it can be blank!
a[href] selects all a elements that have a href="anything" attribute.
[type] selects all elements that have a type="anything". attribute

-Attribute Selector
Select all elements that have a specific attribute
A[attribute]
Combine the attribute selector with another selector (like the tag name selector) by adding it to the end.
[value] selects all elements that have a value="anything" attribute.
a[href] selects all a elements that have a href="anything" attribute.
input[disabled] selects all input elements with the disabled attribute

-Attribute Value Selector
Select all elements that have a specific attribute value
[attribute="value"]
Attribute selectors are case sensitive, each character must match exactly.
input[type="checkbox"] selects all checkbox input elements.

-Attribute Starts With Selector
Select all elements with an attribute value that starts with specific characters
[attribute^="value"]
.toy[category^="Swim"] selects elements with class toy and either category="Swimwear or category="Swimming"
{}
-Attribute Ends With Selector
Select all elements with an attribute value that ends with specific characters
[attribute$="value"]
img[src$=".jpg"] selects all images display a .jpg image.

-Attribute Wildcard Selector
Select all elements with an attribute value that contains specific characters anywhere
[attribute*="value"]
A useful selector if you can identify a common pattern in things like class, href or src attributes.
img[src*="/thumbnails/"] selects all image elements that show images from the "thumbnails" folder.
[class*="heading"] selects all elements with "heading" in their class, like class="main-heading" and class="sub-heading";
//
note that You can apply a set of properties to multiple selectors by specifying the list selectors separated by commas(section, footer: { padding: 80px 20px' }).


in your style tags you can write css rules

to put in a media query, use @media
inside of a media query you have to use full css rules
u can do show me my media queries

to enable flexbox, set display:flex in a .container

cross axis of any flexbox container is vertical, main axis is horizontal
align-items centers across vertical/cross axis
justify-content centers across main axis/horizontal
flex-direction: column or row
flex box containers only run one level deep so if u want a flexbox container too u have
to say display: flex
flex-direction and align-item have to be defined on the container and not the item itself


6/21
html is a map of the city, the actual city is the DOM, the DOM is the real thing the HTML
is the instructions
jQuery directly manipulates the DOM
DOM is a tree structure: each parent has one child
parent, ancestor, child
html - head
     - body - div
you can only have one parent but u can have multiple children
jquery does not manip html it manip the dom
to get jquery, add a script file inside html
add jquery thru codepen in pen settings
$ sign does not always === jquery
but $ is often assoc with jquery
$ === jQuery which calls it, but $ is shorthand for it
the jQuery object is the actual jQuery and $ is just a convenient name for it

a DOM node is an element, like a head, body, div etc
a selector is like CSS diner, any css selector
$('p') grabs all the DOM nodes that are paragraph elements
$('a').eq(k) grabs k'th anchor tag
toggle - if the class isn't there, it adds it, if it's there it removes it

if u give jquery smtng it's going to try to overwrite

some ppl just use jquery and not javascript

you only have head and body, those are special css selectors and u can call them
thru jquery

.before is used in exercises!!!
empty removes everything that's inside the box, not the whole bag
so if u remove the h1 tag u use h1.remove() and not h1.empty() because .empty()
just takes out the paragraph from the h1
jqueryis just javascript, DOM NODES ARE JAVSCRIPT OBJECTS but they are wrapped in jqueryso you
get a lot of extra functions
jquery is an html factory
if you wanna modify you got to GRAB IT thru $('h1').html(7)

DOM traversal: moving around in the DOM
.find() is more timeexpensive than .parents() because they are sooo many children but only
1 parent
you should always try to do .children().children() instead of .find()
if you change the background color of the parent all the children will also be the color

toggleclasss just adds the class, since it adds the class, then it comes later
by the precedence of the ID then ID takes precedence because it is MORE SPECIFIC
the order of precedence: ID overrides classes, look at exact hierarchy

chaining just refers to using .parent().parent() etc

u can use window.load and document.ready, just use document.ready
$(document).ready(callback)
$(window).on('load', callback)


event: when something happens, run some code
every piece of code shouldnt listen to every event, it should only listen to what it cares about

callback is just another name for a function, it just says when an event happens, then u do this

when it comes to input, the command is val not text

event.stopPropagation()

$('ul').on('click', 'button', function(evt) {
  console.log($(this).text())
})
button is delegating farther up the propogation chain - event delegation

// $(this) is the node that you just clicked; this is the string rep of the element,
$(this) is the actual useful object, turns it into a jquery object
$('.val')


JSON
- way of converting strcutured data to and from text so we can save it inside files and send it over the internet
works w ajax so that u can send
ajax requests are sent and received over the internet
json is a STRICT SUBSET of javascript and looks like it but isnt javascript
json only supports arrays, obejcts, strings, numbers, booleans, and null
*****KEY NAMES inside json objects need to always have double quotes around them
two functions built into JAVSCRIPT language: json.parse and json.stringify
json.stringify takes javascript data and turns it into a javascript string that is a
json rep of the data and json.parse takes a string and turns it back into the data it was
stringified from
when you use parse and u put in a lot of spaces, parse will ignore the space when it turns it into data
in json u can always **(do this!!)** parse something that stringify returns:
json.parse(json.stringify({a:7}))

AJAX
- lets you retrieve data from any server inside any webpage. when www was invented, no ajax,
so u had to go places by clicking on links which changes url completely, takes u somewhere
else and then causes browser to download the info and display it on the DOM
ajax lets u stay on the same page and use javascript to retrieve the info u wanna
display and put it on the page right there and then
everywhere uses ajax now to create a modern interactive field


** you use ajax through jquery ($) BUT ajax is not jquery specific. $.ajax({}) acts as a wrapper
to the native APIs
you need a success callback for ajax which is a function that takes 1 argument
which will be called when the ajax request is completed

$('body').append($('<pre>').text('some text here'))

$.ajax({
  url: "...",
  success: function(resp) {
    $('body').append($('<pre>').text(resp))
  }
})

$('body').append($('<pre>').text('some text here'))
<pre> tag is for showing preformatted text

var self = this;

CONCEPT TRACKER:
xs starts at 0, if width of screen is anything > 0, span 6 columns etc
bootstrap: merits of it is that you can just create a table with preset forms and stuff
its just very copy and paste friendly and u dont have to build stuff as much

when u use bootstrap u use clearing system so that the element of the max height
will determine height of the row
but with flex, everything will flex inside the container
h1.horizons selects all h1 elements that have a class of horizons
.horizons h1 is .horizons is a class and then ur looking for any descendents of .horizons
that has class h1

preventDefault default action of the link is to redirect somewhere

u can only use .val() for inputs and everything else is .text()
.val() reads val
thisthing.val(something) replaces thisthing with something
this doesnt have all the jquery functions unless you wrap it in $

event delegation
$('ul').on('click', 'li', function() {
  $(this).text('100');
})
the li is the children of the ul and when u click ul it also applies the func to the li

var answer = $('.lgs').closest('.housing').find('.fua')
$(answer).text('may')
$(answer).attr('href','https://www.google.com/')
$.ajax('/search/sfc/gms', {
      success: function(resp) {
				ajaxResponse = resp;
      }
   })
 $.ajax('/search/sfc/gms', {
    success: function(resp) {
			ajaxResponse = resp;
			$('body').append(resp);
    }
 })
