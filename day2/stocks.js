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
  const grouped = _.groupBy(data, 'ticker')
  let ret = {};
  const tmp = _.each(grouped, (comp) => {
    const sorted = _.sortBy(comp, 'time')
      ret[sorted[0].ticker] = sorted[sorted.length - 1].price - sorted[0].price
  })
  return (ret)
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

  const diffs = (stocks.gainAndLoss(data))
  const descending = Object.values(diffs).sort((a, b) => {
    return b - a
  })
  const highest = descending.shift();
  let ret;
  let tmp = _.each(diffs, (value, key) => {
    if (highest === value) {
      ret = {key, value}
    }
  })
  return ret.key

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

  const diffs = (stocks.gainAndLoss(data))
  const descending = Object.values(diffs).sort((a, b) => {
    return b - a
  })
  const lowest = descending.pop();
  let ret;
  let tmp = _.each(diffs, (value, key) => {
    if (lowest === value) {
      ret = {key, value}
    }
  })
  return ret.key

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
  let objs = []
  const grouped = _.groupBy(data, 'ticker')
  let tmp = _.each(grouped, (group) => {
    let maxTrans = _.max(group, (item) => {
      return item.price
    })
    let minTrans = _.min(group, (item) => {
      return item.price
    })
    objs.push({ticker: maxTrans.ticker, delta: maxTrans.price - minTrans.price})
  })
  const sorted = _.sortBy(objs, 'delta')
  return sorted.pop().ticker
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
  let sum = 0
  let msecs = date.getTime();
  let format = _.each(data, (item) => {
    item.msecs = new Date(item.time).getTime()
    if (item.msecs === msecs && item.ticker in portfolio)
      for (var key in portfolio)
        if (key === item.ticker)
          sum += portfolio[key] * item.price
    
  })
  /* console.log(sum) */
  return sum
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
  const grouped = _.groupBy(data, 'ticker');
  const sorted = _.sortBy(grouped[ticker], 'price');
  const buying = sorted[0];
  const selling = sorted[sorted.length - 1];
  const money = selling.price - buying.price;
  /* console.log( [new Date(buying.time), new Date(selling.time), money] ); */
  return [new Date(buying.time), new Date(selling.time), money];
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
  const widest = stocks.widestTradingRange(data);
  const best = stocks.bestTrade(data, widest);
  console.log(best);
  return [widest, ...best];
};
