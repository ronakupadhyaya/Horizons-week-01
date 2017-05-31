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
  var results = {};

  data.forEach(function(trans){
    if (!(trans.ticker in results)) {
      var companyData = _.filter(data, function(curr) {return curr.ticker === trans.ticker});
      var max = _.max(companyData, function(curr) {return new Date(curr.time).getTime();});
      var min = _.min(companyData, function(curr) {return new Date(curr.time).getTime();});

      results[trans.ticker] = max.price - min.price;
    }
  });
  return results;

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
  var gainsAndLosses = stocks.gainAndLoss(data);
  var biggestGain = _.max(gainsAndLosses, function(curr){return curr})
  var name = _.findKey(gainsAndLosses, function(curr) {return curr === biggestGain;});
  return name;
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
  var gainsAndLosses = stocks.gainAndLoss(data);
  var biggestGain = _.min(gainsAndLosses, function(curr){return curr})
  var name = _.findKey(gainsAndLosses, function(curr) {return curr === biggestGain;});
  return name;
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
  var analyzedData = stocks.gainAndLoss(data);      //get processed data
  var highest = stocks.biggestGainer(data);         
  var lowest = stocks.biggestLoser(data);           
  var highPrice = Math.abs(analyzedData[highest]);  //get respective prices for highest/lowest corp
  var lowPrice = Math.abs(analyzedData[lowest]);
  return (highPrice > lowPrice ? highest : lowest); //return the largest absolute value from high/low corp

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
  var date = new Date(date);
  var portfolioArray = _.keys(portfolio);
  var value = 0;

  var filteredData = _.filter(data, function(curr) {
    var currDate = new Date(curr.time);
    return currDate.getTime() === date.getTime()
      && _.contains(portfolioArray, curr.ticker);
  });

  filteredData.forEach(function(curr) {
    value += (curr.price * portfolio[curr.ticker]);
  })

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

  //filter data to only get transactions for specific ticker
  var filteredData = _.filter(data, function(curr) {
    return curr.ticker === ticker;
  });

  //sort filtered data in ascending order
  filteredData = _.sortBy(filteredData, "time");

  var dates = [];
  var buy = 0;
  var sell = 1;
  var profit = filteredData[1].price - filteredData[0].price;


  //outer loop to find start date
  for (var i = 0; i < (filteredData.length - 1); i++) {

    //inner loop to find end date
    for (var j = i + 1; j < filteredData.length; j++) {
      
      var current = filteredData[j].price - filteredData[i].price;
      if (current > profit) {
        profit = current;
        buy = i;
        sell = j;
      }
    }
  }
  //if (ticker === "AMZN") {debugger;}
  return [new Date(filteredData[buy].time), new Date(filteredData[sell].time), profit ];
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
  var sorted = _.groupBy(data, function(trans) {return trans.ticker;});
  console.log(sorted);
  var topStats = ["", 0, 0, 0];

  for (var ticker in sorted) {
    if (sorted.hasOwnProperty(ticker)) {
      //sorted[ticker] will iterate over the different ticker arrays
      //if (ticker === "AMZN") {debugger;}
      var result = stocks.bestTrade(data, ticker);
      if (topStats[3] < result[2]) {
        topStats[0] = ticker;
        topStats[1] = result[0];
        topStats[2] = result[1];
        topStats[3] = result[2];
      }
    
    }
  }
  console.log(topStats);
  return topStats;
};
