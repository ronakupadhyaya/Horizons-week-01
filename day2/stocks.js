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
  var groupedCompanies = _.groupBy(data, function(transaction){
    return transaction.ticker;
  })

var gainAndLossObj = {};

  _.forEach(groupedCompanies, function(value, key){
    var max = _.max(value, function(value){
      var retVal = new Date(value.time);
      // console.log(retVal);
      return retVal;
    })

    var latestPrice = max.price;

    var min = _.min(value, function(value){
      var retVal = new Date(value.time);
      return retVal;
    })
    var oldestPrice = min.price;

    gainAndLossObj[key] = latestPrice - oldestPrice;


  })
// console.log(gainAndLossObj);
return gainAndLossObj;

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
  var obj = stocks.gainAndLoss(data);
  // console.log(obj);
  var high = -100000;
  var highKey = '';
   _.forEach(obj, function(value, key){
    if(value > high){
      high = value;
      highKey = key;
    }
  })
  return highKey;

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
  var obj = stocks.gainAndLoss(data);
  var low = 10000;
  var lowKey;
  _.forEach(obj, function(value, key){
    if(value < low){
      low = value;
      lowKey = key;
    }
  })
  return lowKey;
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
  var groupedCompanies = _.groupBy(data, function(transaction){
    return transaction.ticker;
  })
  // console.log(groupedCompanies);
var retObj = {};
  _.forEach(groupedCompanies, function(value, key){
    var max = _.max(value, function(value){
      var retVal = value.price;
      // console.log(retVal);
      return retVal;
    })

    var maxPrice = max.price;

    var min = _.min(value, function(value){
      var retVal = value.price;
      return retVal;
    })
    var minPrice = min.price;

    retObj[key] = maxPrice - minPrice;
    // console.log(retObj.key);
    // console.log(key);

});

var high = 0;
var highKey;
_.forEach(retObj, function(value, key){
  if(value > high){
    high = value;
    highKey = key;
  }
})

return highKey;
}

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

  var arr = _.filter(data, function(trx){
    var bool = false;
    _.forEach(portfolio, function(value, key){
      if(key === trx.ticker){
        bool = true;
      }
    })

    var trxTime = new Date(trx.time);
    return trxTime.getTime() === date.getTime() && bool;
  });
var total = 0;

  _.forEach(arr, function(value,key){
    // console.log(key);
    // console.log(value);
    total += (value.price * portfolio[value.ticker]);
  })
  // console.log(arr);

  return total;
  }

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
  var arr = _.filter(data, function(trx){
    return trx.ticker === ticker;
  })
  console.log(arr);

  var sorted = _.sortBy(arr, function(trx){
    return new Date(trx.time);
  })
  console.log(sorted);

if()


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
