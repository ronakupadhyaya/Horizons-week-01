//------------Thurs 6/15 notes-------------------------

//Use Mozilla Devloper Network

// Object Spread

object.keys() //--> only goes thru object's own props
for (prop in object){} //--> goes up prototype

//---------bind-----------------------

function greet(greeting, punctuation) {
  var prefix = greeting || 'Hi';
  var endMark = punctuation || '!';
  var firstWord = prefix + endMark;
  var text = firstWord + ' ' + this.name + ' you are a great ' + this.occupation + '.';
  return text;
}

var abhi = { name: 'Abhi', occupation: 'Model' };
var darwish = { name: 'Darwish', occupation: 'Ninja' };
var greetAbhi = greet.bind(abhi);
// this new function is forever bound to the abhi obj
greetAbhi.call(darwish, 'Sup', '!')
//==> returns "Sup! Abhi you are a great model."

var greetDarwish = greet.bind(darwish);

greet = greet.bind(abhi)
// overrides func so it only works with abhi

greetAbhi = greetAbhi.bind(abhi, 'TTP')
//==> uses 'TTP' as greeting for greetAbhi each time


//------objects---------------------

//   | tedious
//   V
var product1 = {
  name: 'MacBook Pro',
  price: 1499.99,
  isExpensive: function() {
    return this.price > 100;
  }
};
var product2 = {
  name: 'MacBook Air',
  price: 999.99,
  isExpensive: function() {
    return this.price > 100;
  }
};
var product3 = {
  name: 'Lightning Cable',
  price: 99.99,
  isExpensive: function() {
    return this.price > 100;
  }
};

// constructer function

function Product(name, price) {
  this.name = name;
  this.price = price;
  this.isExpensive = function() {
    return this.price > 100;
  }
}

new Product('Joel Embiid Jersey', 21.21)
--> // makes new Product object with given values
// "new" makes function behave differently
// it creates and return a new object 'this'



function Product(name, price) {
  this.name = name;
  this.price = price;
}
Product.prototype.isExpensive = function() {
  return this.price > 100;
}
// uses this method for all that uses

product1.isExpensive(); // -> ???
product2.isExpensive(); // -> ???
product3.isExpensive(); // -> ???

Product.prototype.isExpensive = function() {
  return this.price > 2000;
}
product1.isExpensive(); // -> ???
product2.isExpensive(); // -> ???
product3.isExpensive(); // -> ???
