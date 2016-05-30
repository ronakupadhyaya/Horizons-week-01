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
// The 'price' property is the value of the transaction - can be negative.
// You can access these properties the usual ways, like (assuming a given item is called `trans`): 
// `var price = trans["price"];` or `var ticker = trans.ticker`
// So, the data's gonna look something like:
// var data = [ { "ticker": "MSFT", "time": "2016-05-17T11:02:20", "price": 22.83993924756409 }, ... ];


// Exercise 1. stocks.gainAndLoss(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return an object 
// with all the stocks as keys, and their values being an array with the first value being
// the total gain and the second being the total loss.
// It should look like this: { "AMZN": [500, -25], ... }
stocks.gainAndLoss = function(data) {
  // YOUR CODE HERE
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
};

// Exercise 4. stocks.widestTradingRange(data<Transaction[]>)
// Write a function that takes an array of Transaction objects. It should return the 
// ticker of the stock with the widest trading range (biggest variance in transaction price)
// 
// 
stocks.widestTradingRange = function(data) {
  // YOUR CODE HERE
};

// [Bonus] Exercise 5. stocks.totalPortfolioValue(data<Transaction[]>, ticker<String>)
// Write a function that takes an array of Transaction objects and a string corresponding
// to a ticker of a company in the transaction data. It should return the total portfolio
// value of the given company at day's end.
// 
// hint. exercise 3 can help!
stocks.totalPortfolioValue = function(data, ticker) {
  // YOUR CODE HERE
};

// [Bonus] Exercise 6. stocks.totalPortfolioGains(data<Transaction[]>, ticker<String>)
// Write a function that takes an array of Transaction objects and a string corresponding
// to a ticker of a company in the transaction data. It should return the total portfolio
// value of the company at day's end.
// 
stocks.totalPortfolioGains = function(data, ticker) {
  // YOUR CODE HERE
};
