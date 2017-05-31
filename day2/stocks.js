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
  var sortedByCoObj = {};
  sortedByCoObj = _.groupBy(data, function(company) {
    return company.ticker;
  })
  var time = [];
  var timeCopy = [];
  var summary = {};
  var gainLoss = 0;
  _.forEach(sortedByCoObj, function(value, key) {    //value is an array of transaction objects; key is the company/ticker
    value.forEach(function(element) {
      time.push(element.time);
      timeCopy = time.slice();
    })
    var latestTime = time.reduce(function(a, b) {
      if (a < b) {
        return b;
      } return a;
    })
    var indexLatest = time.indexOf(latestTime);
    var earliestTime = timeCopy.reduce(function(a, b) {
      if (a > b) {
        return b;
      } return a;
    })
    var indexEarliest = timeCopy.indexOf(earliestTime);
    gainLoss = (value[indexLatest].price - value[indexEarliest].price).toFixed(2);
    summary[key] = gainLoss;
    time = [];
    timeCopy = [];
  })
  return summary;
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
  var priceChangeObj = stocks.gainAndLoss(data);
  var priceChangeArr = [];
  _.forEach(priceChangeObj, function(value, key) {
    priceChangeArr.push(parseFloat(value));
  })
  var maxChange = priceChangeArr.reduce(function(a, b) {
    if (a<=b) {
      return b;
    }
    return a;
  })
  var i = priceChangeArr.indexOf(maxChange);
  return Object.keys(priceChangeObj)[i];
};

// Exercise 3. stocks.biggestLoser(data)
//
// Write a function that finds the stock that went down in price the most
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
  var priceChangeObj = stocks.gainAndLoss(data);
  var priceChangeArr = [];
  _.forEach(priceChangeObj, function(value, key) {
    priceChangeArr.push(parseFloat(value));
  })
  var maxLoss = priceChangeArr.reduce(function(a, b) {
    if (a > b) {
      return b;
    }
    return a;
  })
  var i = priceChangeArr.indexOf(maxLoss);
  return Object.keys(priceChangeObj)[i];
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
  var sortedByCoObj = {};
  sortedByCoObj = _.groupBy(data, function(company) {
    return company.ticker;
  })
  var price = [];
  var priceCopy = [];
  var summary = {};
  var difference = 0;
  _.forEach(sortedByCoObj, function(value, key) {    //value is an array of transaction objects; key is the company/ticker
    value.forEach(function(element) {
      price.push(element.price);
      priceCopy = price.slice();
    })
    var highestPrice = price.reduce(function(a, b) {
      if (a < b) {
        return b;
      } return a;
    })
    var indexHighest = price.indexOf(highestPrice);
    var lowestPrice = priceCopy.reduce(function(a, b) {
      if (a > b) {
        return b;
      } return a;
    })
    var indexLowest = priceCopy.indexOf(lowestPrice);
    difference = value[indexHighest].price - value[indexLowest].price;
    summary[key] = difference;
    price = [];
    priceCopy = [];
  })
  var diffArr = [];
  _.forEach(summary, function(value, key) {
    diffArr.push(parseFloat(value));
  })
  var maxChange = diffArr.reduce(function(a, b) {
    if (a<=b) {
      return b;
    }
    return a;
  })
  var i = diffArr.indexOf(maxChange);
  return Object.keys(summary)[i];
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
  var processObj = _.groupBy(data, function(trans) {
    return trans.time;
  })
  var dateArr = Object.keys(processObj);
  var dateIndex = dateArr.indexOf(date.toJSON());
  // var portfolioTicker = Object.keys(portfolio);
  var portfolioShares = Object.values(portfolio);
  // console.log("portfolio tickers: ", portfolioTicker);
  // console.log("portfolio shares", portfolioShares);
  var dailyStats = processObj[date.toJSON()];    //Array of objects

  var priceArr = [];
  _.forEach(portfolio, function(value, key) {    //value: number of shares    key: ticker
    dailyStats.forEach(function(element) {     //working on an array of objects    element is an object
      if (element.ticker === key) {
        priceArr.push(element.price);
      }
    })
  })
  // console.log("price array", priceArr);
  var result = 0;
  for (var i=0; i<portfolioShares.length; i++) {
    result += portfolioShares[i]*priceArr[i];
  }
  return result;
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
  var sortedByCoObj = {};
  sortedByCoObj = _.groupBy(data, function(company) {    //Object; key: ticker; value: array of transactions
    return company.ticker;
  })
  console.log("sorted object", sortedByCoObj);
  console.log(sortedByCoObj[ticker]);    //array of transactions


  var price = [];
  _.forEach(sortedByCoObj[ticker], function(element) {
    price.push(element.price);
  })
  var highestPrice = price.reduce(function(a, b) {
    if (a < b) {
      return b;
    } return a;
  })
  var indexHighest = price.indexOf(highestPrice);
  var lowestPrice = price.reduce(function(a, b) {
    if (a > b) {
      return b;
    } return a;
  })
  var indexLowest = price.indexOf(lowestPrice);
  console.log("highest price", highestPrice, "lowest price", lowestPrice);
  var highDateStr = sortedByCoObj[ticker][indexHighest].time;
  var lowDateStr = sortedByCoObj[ticker][indexLowest].time;
    // console.log("highest date", highDateStr, "lowest date", lowDateStr);
  return [new Date(lowDateStr), new Date(highDateStr), highestPrice-lowestPrice];
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
