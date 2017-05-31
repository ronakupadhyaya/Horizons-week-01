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
  var stocks = _.groupBy(data, function(val){
    return val.ticker;
  })
  var toReturn = {};
  stocks = _.mapObject(stocks, function(arr, ticker){
    return _.sortBy(arr, function(contents) {
      return contents.time;
    })
  })
  _.mapObject(stocks, function(arr, ticker){
    toReturn[ticker] = arr[arr.length - 1].price - arr[0].price;
  })
  return toReturn;
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
  var change = stocks.gainAndLoss(data);
  var maxGain = 0;
  var maxTicker = "";
  _.mapObject(change, function(val,key){
    if(val > maxGain){
      maxGain = val;
      maxTicker = key;
    }
  });
  return maxTicker;
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
  var change = stocks.gainAndLoss(data);
  var minGain = 100000;
  var minTicker = "";
  _.mapObject(change, function(val,key){
    if(val < minGain){
      minGain = val;
      minTicker = key;
    }
  });
  return minTicker;
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
  var stocks = _.groupBy(data, function(val){
    return val.ticker;
  })
  var toReturn = {};
  stocks = _.mapObject(stocks, function(arr, ticker){
    return _.sortBy(arr, function(contents) {
      return contents.price;
    })
  })
  _.mapObject(stocks, function(arr, ticker){
    toReturn[ticker] = arr[arr.length - 1].price - arr[0].price;
  })
  var maxRange = 0;
  var maxTicker = "";
  _.mapObject(toReturn, function(val,key){
    if(val > maxRange){
      maxRange = val;
      maxTicker = key;
    }
  });
  return maxTicker;
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
//debugger;
  var toReturn = 0;
  //console.log(portfolio);
  for (var i = 0; i < data.length; i++) {
    //console.log(data[i]);
    if (new Date(data[i].time).getTime() === date.getTime() && (data[i].ticker in portfolio)) {
      toReturn += portfolio[data[i].ticker] * data[i].price;
    }
  }
  return toReturn;
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
  var thisTicker = _.filter(data, function(val) {
    return val.ticker === ticker;
  })
  thisTicker = _.sortBy(thisTicker, function(val) {
    return val.time;
  })
  var pairs = [];
  for (var i = 0; i < thisTicker.length - 1; i++) {
    var bestSell = thisTicker[i + 1];
    for (var j = i + 2; j < thisTicker.length; j++) {
      if (thisTicker[j].price > bestSell.price) {
        bestSell = thisTicker[j];
      }
    }
    var priceChange = parseFloat(bestSell.price) - parseFloat(thisTicker[i].price);
    pairs.push([priceChange, thisTicker[i], bestSell]);
  }
  var maxTrans = pairs[0];
  for (var i = 1; i < pairs.length; i++) {
    if (pairs[i][0] > maxTrans[0]) {
      maxTrans = pairs[i];
    }
  }
  return [new Date(maxTrans[1].time), new Date(maxTrans[2].time), maxTrans[0]];
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
  var stocksList = _.groupBy(data, function(val){
    return val.ticker;
  })
  var stockNames = Object.keys(stocksList);
  var bestTrades = [];
  for (var i = 0; i < stockNames.length; i++) {
    var trade = stocks.bestTrade(data, stockNames[i]);
    trade.push(stockNames[i]);
    bestTrades.push(trade);
  }
  var best = bestTrades[0];
  for (var i = 1; i < bestTrades.length; i++) {
    if (bestTrades[i][2] > best[2]) {
      best = bestTrades[i];
    }
  }
  return [best[3], new Date(best[0]), new Date(best[1]), best[2]];
};