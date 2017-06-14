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
  _.map(data, function(a) {
    a.time = new Date(a.time);
  });

  var grouped = _.groupBy(data, function(a) {
    return a.ticker
  });

  var dates = [];
  var i = 0;
  for (var company in grouped) {
    dates[i] = [company, []];
    for (var d = 0; d < grouped[company].length; d++) {
      dates[i][1].push([grouped[company][d].time, grouped[company][d].price]);
    }
    i++;
  }

  for (var k = 0; k < dates.length; k++) {
    dates[k][1] = dates[k][1].sort(function(x, y) {
      return x[0].getTime() - y[0].getTime();
    })
  }
  var return_object = {}
  for (var k = 0; k < dates.length; k++) {
    return_object[dates[k][0]] = (dates[k][1][dates[k][1].length - 1][1] - dates[k][1][0][1]);
  }

  return return_object;
}

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
  var gains = stocks.gainAndLoss(data);
  var temp = _.reduce(gains, function(a, b) {
    if (a > b)
      return a;
    return b;
  });

  return _.invert(gains)[temp];
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
  var losses = stocks.gainAndLoss(data);
  var temp = _.reduce(losses, function(a, b) {
    if (a < b)
      return a;
    return b;
  });

  return _.invert(losses)[temp];
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
  var gains = stocks.gainAndLoss(data);
  var temp = _.reduce(gains, function(a, b) {
    if (Math.abs(a) > Math.abs(b))
      return a;
    return b;
  });

  return _.invert(gains)[temp];
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
  _.map(data, function(a) {
    a.time = new Date(a.time);
  });
  var filtered = _.filter(data, function(obs) {
    return ((obs.time.getTime() - date.getTime()) == 0)
  });
  var portfolio_keys = Object.keys(portfolio);

  return _.reduce(filtered, function(acc, next_obj) {
    if (portfolio_keys.indexOf(next_obj.ticker) >= 0)
      return acc + (next_obj.price * (portfolio[next_obj.ticker]))
    return acc
  }, 0)
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
  _.map(data, function(a) {
    a.time = new Date(a.time);
  });

  var filtered = _.filter(data, function(obs) {
    return (obs.ticker === ticker)
  });

  var get_new_list = _.map(filtered, function(obj) {
    return [obj.price, obj.time]
  });

  var sorrted = get_new_list.sort(function(time_price_one, time_price_two) {
    return time_price_one[1].getTime() - time_price_two[1].getTime()
  });

  var all_possible_combinations = [];
  for (var i = 0; i < sorrted.length - 2; i++) {
    for (var j = i + 1; j < sorrted.length; j++) {
      all_possible_combinations.push([sorrted[j][0] - sorrted[i][0], sorrted[i][1], sorrted[j][1]])
    }
  }
  var lasstly_sorted = all_possible_combinations.sort(function(x, y) {
    return x[0] - y[0]
  });

  var best = all_possible_combinations[all_possible_combinations.length - 1];
  return [best[1], best[2], best[0]];
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
  var grouped = _.groupBy(data, function(a) {
    return a.ticker
  });

  var trades = []

  for (var temp in grouped) {
    trades.push([stocks.bestTrade(data, temp), temp])
  }

  var sorted = trades.sort(function(a, b) {
    return a[0][2] - b[0][2];
  })

  var temp = sorted[sorted.length - 1][0]

  return ([sorted[sorted.length - 1][1], temp[0], temp[1], temp[2]]);

}
