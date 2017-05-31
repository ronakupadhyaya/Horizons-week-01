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
  var obj = _.groupBy(data,function(a){
    return a.ticker;
  });

  var arr = _.pairs(obj);
  //console.log(arr);

  var ans = {
    GOOG: 0,
    NFLX: 0,
    FB: 0,
    MSFT: 0,
    AMZN: 0,
    NVDA: 0
  }

  for(var i = 0; i < arr.length; i++){
    var earliest = new Date().getTime();
    var latest = 0;
    var end;
    var start;

    for(var n = 0; n < arr[i][1].length; n++){
      var date = new Date(arr[i][1][n].time);
      date = date.getTime();
      if(date < earliest){
        earliest = date;
      }
      if(date > latest){
        latest = date;
      }
    }

    for(var g = 0; g < arr[i][1].length; g++){
      var da = new Date(arr[i][1][g].time);
      da = da.getTime();
      if(da === earliest){
        start = arr[i][1][g].price;
      }
      if(da ===latest){
        end = arr[i][1][g].price;
      }
    }
    var diff = end - start;
    ans[arr[i][0]] = diff;
  }

  return ans;
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
  var ob = stocks.gainAndLoss(data);
  var arr = _.pairs(ob);
  var max = 0;
  var tick;
  for(var i = 0; i < arr.length; i++){
    if(arr[i][1] > max){
      max = arr[i][1];
      tick = arr[i][0];
    }
  }
  return tick;
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
  var ob = stocks.gainAndLoss(data);
  var arr = _.pairs(ob);
  var min = 1000000;
  var tick;
  for(var i = 0; i < arr.length; i++){
    if(arr[i][1] < min){
      min = arr[i][1];
      tick = arr[i][0];
    }
  }
  return tick;
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
  var obj = _.groupBy(data,function(a){
    return a.ticker;
  });

  var arr = _.pairs(obj);

  var widest = 0;
  var ans;
  for(var i = 0; i < arr.length; i++){
    var lowestPrice = 10000;
    var highestPrice = 0;
    for(var n = 0; n < arr[i][1].length; n++){
      var price = arr[i][1][n].price;
      if(price < lowestPrice){
        lowestPrice = price;
      }
      if(price > highestPrice){
        highestPrice = price;
      }
    }
    var range = highestPrice - lowestPrice;
    if(range > widest){
      widest = range;
      ans = arr[i][0];
    }
  }
  return ans;
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
