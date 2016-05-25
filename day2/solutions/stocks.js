"use strict";

window.stocks = {};

// Preface:
// You will be implementing several key functions for a stock analysis program. We are providing you with the data whose format is described in the next paragraph. You can view the data under data/transactions.js. Each function you implement will be tested with the data from that file.

// Data:
// The data that will be run through each function is an array of Transaction objects. Transaction objects have three properties: 'ticker', 'time' and 'price'.
// The 'ticker' property is the name of the company to which the transaction refers to.
// The 'time' property is the time of the transaction on 5/17/2016.
// The 'price' property is the value of the transaction - can be negative.
// You can access these properties the usual ways, like (assuming a given item is called `trans`): `var price = trans["price"];` or `var ticker = trans.ticker`

// Exercise 1. stocks.biggestGainer(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return the ticker of the biggest gainer of the given list of stock transactions (the stock that made the most that day)
//
// hint. use maybe doing exercise 3 first will help.
stocks.biggestGainer = function(data) {
  // YOUR CODE HERE
  var gainer = '';
  var highest = 0;
  data = stocks.gainAndLoss(data);
  for (var co in data) {
    if (data[co][0] > highest) {
      gainer = co;
    } 
  };
  return gainer;
};

// Exercise 2. stocks.biggestLoser(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return the ticker of the biggest loser of the stocks (the stock that lost the most that day)
//
// hint. maybe doing exercise 3 and 1 will help.
stocks.biggestLoser = function(data) {
  // YOUR CODE HERE
  var loser = '';
  var lowest = 0;
  data = stocks.gainAndLoss(data);
  for (var co in data) {
    if (data[co][0] > lowest) {
      loser = co;
    } 
  };
  return loser;
};

// Exercise 3. stocks.gainAndLoss(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return an object with all the stocks as keys, and their values being an array with the first value being the total gain and the second being the total loss.
// It should look like this: { "AMZN": [500, -25], ... }
stocks.gainAndLoss = function(data) {
  // YOUR CODE HERE
  // console.log(data);
  var cos = {};
  data.forEach(function(trans) {
    // check if in cos, if not, create
    if (!(trans.ticker in cos)) {
      cos[trans.ticker] = [0, 0];
    }
    
    // if price positive, add to current gain
    // if price neg, add to current loss
    var ind = (trans.price < 0) ? 1 : 0;
    
    cos[trans.ticker][ind] += trans.price;
  });
  // console.log(cos);
  return cos;
};

// Exercise 4. stocks.widestTradingRange(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return the ticker of the stock with the widest trading range (biggest variance in transaction price)
// 
// 
stocks.widestTradingRange = function(data) {
  // YOUR CODE HERE
  var comps = {};
  
  // Figure out biggest transaction ammounts for buy & sell
  data.forEach(function(trans) {
    // check if in cos, if not, create
    if (!(trans.ticker in comps)) {
      comps[trans.ticker] = [0, 0];
    }
    
    // if price positive, add to current gain
    // if price neg, add to current loss
    var ind = (trans.price < 0) ? 1 : 0;
    if (Math.abs(trans.price) > Math.abs(comps[trans.ticker][ind])) {
      comps[trans.ticker][ind] = trans.price;
    }
  });
  
  // Subtract them
  var lgCo = '';
  var lgVar = 0;
  for (var co in comps) {
    var vari = comps[co][0] - comps[co][1];
    if (lgVar < vari) {
      lgVar = vari;
      lgCo = co;
    }
  }
  
  return lgCo;
};

// [Bonus] Exercise 5. stocks.totalPortofolioValue(data<Transaction[]>, ticker<String>)
// Write a function that takes an array of Transaction objects and a string corresponding to a ticker of a company in the transaction data. It should return the total portofolio value of the company you gave it.
// 
// hint. exercise 3 can help!
stocks.totalPortofolioValue = function(data, ticker) {
  // YOUR CODE HERE
  // can do some input validation
  var comps = stocks.gainAndLoss(data);
  var val = comps[ticker][0] + comps[ticker][1];
  console.log(val);
  return val;
};

// [Bonus] Exercise 6. stocks.totalPortofolioGains(data<Transaction[]>, ticker<String>)
// Write a function that takes an array of Transaction objects and a string corresponding to a ticker of a company in the transaction data. It should return the total portofolio value of the company you gave it.
// 
stocks.totalPortofolioGains = function(data, ticker) {
  // YOUR CODE HERE
  var comps = stocks.gainAndLoss(data);
  return comps[ticker][0]

};
