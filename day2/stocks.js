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
  // YOUR CODE HERE

  var grouped = _.groupBy(data, function(stock){
    return stock.ticker;
  });
  var profits = {};
  _.forEach(grouped, function(stocks, company){
    grouped[company] = stocks.sort(function(a,b){
      var date1 = new Date(a.time);
      var date2 = new Date(b.time)
      return date1 - date2;
    });
    var initPrice = grouped[company][0].price;
    var finalPrice = grouped[company][grouped[company].length -1].price;
    profits[company] = finalPrice - initPrice;
  });
  return profits;
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
  // YOUR CODE HERE
  var gainsAndLosses = stocks.gainAndLoss(data);
  var profits = []
  _.forEach(gainsAndLosses, function(profit, company){
    profits.push([company, profit]);
  });
  var biggestGainer = _.reduce(profits, function(a,b){
    return a[1] >= b[1] ? a : b;
  });
  return biggestGainer[0];
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
  // YOUR CODE HERE
  var gainsAndLosses = stocks.gainAndLoss(data);
  var profits = []
  _.forEach(gainsAndLosses, function(profit, company){
    profits.push([company, profit]);
  });
  var biggestGainer = _.reduce(profits, function(a,b){
    return a[1] <= b[1] ? a : b;
  });
  return biggestGainer[0];
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
  // YOUR CODE HERE
  var grouped = _.groupBy(data, function(stock){
    return stock.ticker;
  });

  var tradingRanges = {};

  _.forEach(grouped, function(stocks, company){
    grouped[company] = stocks.sort(function(a,b){
      return a.price - b.price;
    });
    var lowestPrice = grouped[company][0].price;
    var largestPrice = grouped[company][grouped[company].length -1].price;
    tradingRanges[company] = largestPrice - lowestPrice;
  });

  var rangeArr = [];
  _.forEach(tradingRanges, function(range, company){
    rangeArr.push([company, range]);
  });
  var widestRangePair = _.reduce(rangeArr, function(a,b){
    return a[1] >= b[1] ? a : b;
  });
  return widestRangePair[0];
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
  var value = 0;

  _.forEach(portfolio, function(shares, company) {
    var companyStockArr = data.filter(function(stock) {
      var stockDate = new Date(stock.time);
      return date.getTime() === stockDate.getTime() && stock.ticker === company;
    });
    var companyStock = companyStockArr.length === 1 ? companyStockArr[0] : false;

    // check for valid return
    if (!companyStock) throw 'could not find stock value at this time';

    value += companyStock.price * parseFloat(shares);
  });

  return value;
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
  var grouped = _.groupBy(data, function(stock){
    return stock.ticker;
  });

  var tickerGroup = grouped[ticker];

  var sortedTickerGroup = tickerGroup.sort(function(a,b){
    var date1 = new Date(a.time);
    var date2 = new Date(b.time)
    return date1 - date2;
  });

  var curWidestRange = -Infinity;
  var curStartDate;
  var curEndDate;
  for (var i=0; i<sortedTickerGroup.length; i++) {
    for (var j=i; j<sortedTickerGroup.length; j++) {
      var initialPrice = sortedTickerGroup[i].price;
      var finalPrice = sortedTickerGroup[j].price;

      if (finalPrice - initialPrice > curWidestRange) {
        curWidestRange = finalPrice - initialPrice;
        curStartDate = new Date(sortedTickerGroup[i].time);
        curEndDate = new Date(sortedTickerGroup[j].time);
      }
    }
  }

  return [curStartDate, curEndDate, curWidestRange];
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
  var groupedCompanies = _.groupBy(data, function($tock){
    return $tock.ticker;
  });

  var curBestTradeEver = ["fakeCompany", 'none', 'none', -Infinity]; // dummy placeholder
  _.forEach(groupedCompanies, function($tocks, company) {
    var curBestTrade = stocks.bestTrade(data, company);
    console.log(curBestTrade[2]);
    if (curBestTrade[2] > curBestTradeEver[3]) {
      curBestTrade.unshift(company);
      curBestTradeEver = curBestTrade;
    }
  });

  return curBestTradeEver;
};
