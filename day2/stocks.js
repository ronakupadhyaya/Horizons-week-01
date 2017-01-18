"use strict";

window.stocks = {};

// # Introduction
//
// You will be implementing several key functions for a stock analysis program.
// We are providing you with the data whose format is described in the next paragraph.
// You can view the data under data/transactions.js. Each function you implement
// will be tested with the data from that file.

// # Data
//
// The data that will be run through each function is an array of Transaction objects.
// Transaction objects have three properties: 'ticker', 'time' and 'price'.
// The 'ticker' property is the name of the company to which the transaction refers to.
// The 'time' property is the time of the transaction on 5/17/2016.
// The 'price' property is the price of the stock of 'ticker' at 'time'.
// You can access these properties the usual ways, like (assuming a given item is called `trans`):
// `var price = trans["price"];` or `var ticker = trans.ticker`
//
// So, the data's gonna look something like:
// var data = [ { "ticker": "MSFT", "time": "2016-05-17T11:02:20", "price": 22.83 }, ... ];


// Exercise 1. stocks.gainAndLoss(data)
//
// Write a function that calculates the total loss or gain for each ticker/company.
// This function should return an object with stock tickers as keys and the total
// gain or loss for the given stock as the values.
//
// Total gain or loss is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.gainAndLoss(data) -> {
//   GOOG: -32.36,
//   NFLX: 43.44,
//   FB: -47.36,
//   MSFT: -16.21,
//   AMZN: 299.04,
//   NVDA: 17.5
// }
stocks.gainAndLoss = function(data) {
  var sort = _.sortBy(data, 'time')
  var groupTicker = _.groupBy(sort, 'ticker')
  var answer = {'AMZN': 0, 'FB': 0, 'GOOG': 0, 'MSFT': 0, 'NFLX': 0, "NVDA": 0}
  answer.AMZN = groupTicker.AMZN[29].price - groupTicker.AMZN[0].price;
  answer.FB = groupTicker.FB[29].price - groupTicker.FB[0].price;
  answer.GOOG = groupTicker.GOOG[29].price - groupTicker.GOOG[0].price;
  answer.MSFT = groupTicker.MSFT[29].price - groupTicker.MSFT[0].price;
  answer.NFLX = groupTicker.NFLX[29].price - groupTicker.NFLX[0].price;
  answer.NVDA = groupTicker.NVDA[29].price - groupTicker.NVDA[0].price;
  return answer;
  // YOUR CODE HERE
};

// Exercise 2. stocks.biggestGainer(data)
//
// Write a function that finds the stock that went up in price the most
// in absolute terms (i.e. not percentage-wise) over the lifetime of
// the given data.
//
// Total gain is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.biggestGainer(stockData) -> 'AMZN'
//
// You can use stocks.gainAndLoss() in your answer.
stocks.biggestGainer = function(data) {
  var arr=[];
  var data1 = stocks.gainAndLoss(data);
  for (var key in data1){
    arr.push([key, data1[key]])
  }
  arr.sort(function(a, b){
    return b[1] - a[1]
  })
  return arr[0][0]
  // YOUR CODE HERE
};

// Exercise 3. stocks.biggestLoser(data)
//
// Write a function that finds the stock that went up in price the most
// in absolute terms (i.e. not percentage-wise) over the lifetime of
// the given data.
//
// Total loss is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.biggestLoser(stockData) -> 'GOOG'
//
// You can use stocks.gainAndLoss() in your answer.
stocks.biggestLoser = function(data) {
  var arr=[];
  var data1 = stocks.gainAndLoss(data);
  for (var key in data1){
    arr.push([key, data1[key]]);
  }
  arr.sort(function(a, b){
    return a[1] - b[1];
  })
  return arr[0][0];
  // YOUR CODE HERE
};

// Exercise 4. stocks.widestTradingRange(data)
//
// Write a function that finds the ticker of the stock with the widest trading
// range (biggest difference between the lowest and the highest stock price)
// over the lifetime of the given dataset.
//
// Example.
// stocks.widestTradingRange(data) -> 'AMZN'
stocks.widestTradingRange = function(data) {
  var sort = _.sortBy(data, 'price')
  var groupTicker = _.groupBy(sort, 'ticker')
  var answer = {'AMZN': 0, 'FB': 0, 'GOOG': 0, 'MSFT': 0, 'NFLX': 0, "NVDA": 0}
  answer.AMZN = groupTicker.AMZN[29].price - groupTicker.AMZN[0].price;
  answer.FB = groupTicker.FB[29].price - groupTicker.FB[0].price;
  answer.GOOG = groupTicker.GOOG[29].price - groupTicker.GOOG[0].price;
  answer.MSFT = groupTicker.MSFT[29].price - groupTicker.MSFT[0].price;
  answer.NFLX = groupTicker.NFLX[29].price - groupTicker.NFLX[0].price;
  answer.NVDA = groupTicker.NVDA[29].price - groupTicker.NVDA[0].price;
  var arr=[];
  for (var key in answer){
    arr.push([key, answer[key]])
  }
  arr.sort(function(a, b){
    return b[1] - a[1]
  })
  return arr[0][0]
  // YOUR CODE HERE
};

// Exercise 5. stocks.portfolioValue(data, date, portfolio)
// Write a function that calculates the value of a stock portfolio at a given
// date.
//
// Arguments:
//  - date: a JavaScript Date object indicating which point in time to calculate
//    the value of the portfolio for
//  - portfolio: an object mapping tickers to number of shares owned
//
// ex.
// stocks.totalPortfolioValue(data,
//                            new Date('2016-06-30T00:00:00.000Z'),
//                            {NFLX: 1, GOOG: 10})
//    -> 513.31
stocks.portfolioValue = function(data, date, portfolio) {
  var groupByDate = _.groupBy(data, "time");
  var value = 0;
  var amounts = [];
  var newDate = date.toISOString();
  var keyList = Object.keys(portfolio);
  for (var x = 0; x < keyList.length; x++) {
    var price = 0;
    for (var i = 0; i < groupByDate[newDate].length; i++) {
      if (groupByDate[newDate][i].ticker === keyList[x]) {
        price = groupByDate[newDate][i].price;
      }
    }
    var oneValue = price * portfolio[keyList[x]];
    amounts.push(oneValue);
  }
  value = amounts.reduce(function(a,b) {
    return a + b;
  });
  return value;
  // YOUR CODE HERE
};

// [Bonus] Exercise 6. stocks.bestTrade(data, ticker)
// Write a function to figure out the best time to buy and sell a given
// stock/ticker/company.
//
//  - You can only buy the stock once and sell it once.
//  - You need to buy the stock before you sell it.
//
// You should return an array containing three items:
//  1. buy date (a Date object)
//  2. sell date (a Date object)
//  3. amount of money made in trade i.e. selling price minus buying price (a number)
//
// Example.
// stocks.bestTrade(stockData, 'GOOG') ->
//  [new Date('2016-06-19T00:00:00.000Z'),
//   new Date('2016-06-28T00:00:00.000Z'),
//   55.54]
stocks.bestTrade = function(data, ticker) {
  // YOUR CODE HERE
};

// [Super Bonus] Exercise 8. stocks.bestTradeEver(data)
// Write a function to figure out the best stock to buy and when to
// buy and sell it.
//
//  - You can only buy one stock.
//  - You can only buy the stock once and sell it once.
//  - You need to buy the stock before you sell it.
//
// You should return an array containing four items:
//  1. ticker (a string)
//  2. buy date (a Date object)
//  3. sell date (a Date object)
//  4. amount of money made in trade i.e. selling price minus buying price (a number)
//
// Example.
// stocks.bestTradeEver(data) ->
//  ['AMZN',
//   new Date('2016-06-02:00:00.000Z'),
//   new Date('2016-06-24:00:00.000Z'),
//   55.54]
stocks.bestTradeEver = function(data) {
  // YOUR CODE HERE
};
