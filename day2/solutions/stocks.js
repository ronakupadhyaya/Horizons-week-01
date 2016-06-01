"use strict";

window.stocks = {};

// Preface:
// You will be implementing several key functions for a stock analysis program. 
// We are providing you with the data whose format is described in the next paragraph. 
// You can view the data under data/transactions.js. Each function you implement 
// will be tested with the data from that file.

// Data:
// The data that will be run through each function is an array of Transaction objects. 
// Transaction objects have three properties: 'ticker', 'time' and 'price'.
// The 'ticker' property is the name of the company to which the transaction refers to.
// The 'time' property is the time of the transaction on 5/17/2016.
// The 'price' property is the change in price of the stock of 'ticker' at 'time'.
// Be careful! 'price' indicates the delta of the stock price, not the stock price itself.
// Also keep in mind that 'price' will be negative to indicate a drop in the stock price.
// You can access these properties the usual ways, like (assuming a given item is called `trans`): 
// `var price = trans["price"];` or `var ticker = trans.ticker`
// So, the data's gonna look something like:
// var data = [ { "ticker": "MSFT", "time": "2016-05-17T11:02:20", "price": 22.83993924756409 }, ... ];


// Exercise 1. stocks.gainAndLoss(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return an object 
// with all the stock tickers as keys, and the values as an array with the first value being
// the total gain and the second being the total loss. Keep in mind that each object in the
// passed in data is either a gain or a loss based on the 'price' property.
// The return object should look like this: { "AMZN": [500, -25], ... }
stocks.gainAndLoss = function(data) {
  // YOUR CODE HERE
  var ret = {};
  _.forEach(data, function(trans) {
    ret[trans.ticker] = ret[trans.ticker] || [0, 0];
    ret[trans.ticker][+(trans.price < 0)] += trans.price;
  });
  return ret;

  // ------------------------------------------------------
  // Alternate Solution without Underscore
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
  return cos;
};

// Exercise 2. stocks.biggestGainer(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return the ticker
// of the biggest gainer of the given list of stock transactions (the stock that made the most that day)
// 
// ex. stocks.biggestGainer(stockData) -> 'AMZN'
// 
// hint. use maybe doing `gainAndLoss` first will help.

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

// Exercise 3. stocks.biggestLoser(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return the ticker of
// the biggest loser of the stocks (the stock that lost the most that day)
//
// ex. stocks.biggestLoser(stockData) -> 'GOOG'
// 
// hint. maybe doing `gainAndLoss` and `biggestGainer` will help.
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

// Exercise 4. stocks.widestTradingRange(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return the 
// ticker of the stock with the widest trading range (biggest variance in transaction price)
// 
// 
stocks.widestTradingRange = function(data) {
  // YOUR CODE HERE

  var comps = stocks.gainAndLoss(data);
  var max = 0;
  _.forEach(comps, function(comp) {
    if((comp[0] - comp[1]) > max) {
      max = comp[0] - comp[1]
    }
  });
  return _.findKey(comps, function(v) {
    console.log(v)
    return max === v[0] - v[1];
  });

  var comps = {};

  // ------------------------------------------------------
  // Alternate Solution without Underscore
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

// [Bonus] Exercise 5. stocks.totalPortfolioValue(data<Transaction[]>, ticker<String>)
// Write a function that takes an array of Transaction objects and a string corresponding
// to a ticker of a company in the transaction data. It should return the total portfolio
// value of the given company at day's end.
// 
// hint. exercise 3 can help!
stocks.totalPortfolioValue = function(data, ticker) {
  // YOUR CODE HERE
  return _.reduce(stocks.gainAndLoss(data)[ticker], function(a, b) {
    return a + b;
  });

  // ------------------------------------------------------
  // Alternate Solution without Underscore
  // can do some input validation
  var comps = stocks.gainAndLoss(data);
  var val = comps[ticker][0] + comps[ticker][1];
  console.log(val);
  return val;
};

// [Bonus] Exercise 6. stocks.totalPortfolioGains(data<Transaction[]>, ticker<String>)
// Write a function that takes an array of Transaction objects and a string corresponding
// to a ticker of a company in the transaction data. It should return the total portfolio
// value of the company at day's end.
// 
stocks.totalPortfolioGains = function(data, ticker) {
  // YOUR CODE HERE
  var comps = stocks.gainAndLoss(data);
  return comps[ticker][0]

};
