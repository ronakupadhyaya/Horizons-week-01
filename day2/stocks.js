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
  var firstLast = {};
  _.forEach(data, function(stock) {
    if (stock["ticker"] in firstLast) {
      if (new Date(stock["time"]).getTime() > new Date(firstLast[stock["ticker"]][0]["time"]).getTime()) {
        firstLast[stock["ticker"]][0] = stock
      } else if (new Date(stock["time"]).getTime() < new Date(firstLast[stock["ticker"]][1]["time"]).getTime()) {
        firstLast[stock["ticker"]][1] = stock
      }
    } else {
      firstLast[stock["ticker"]] = [stock, stock]
    }
  })
  return _.mapObject(firstLast, function(value, key) {
    return value[0]["price"] - value[1]["price"];
  })

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
  var stock_obj = stocks.gainAndLoss(data);
  var pairs = _.pairs(stock_obj);
  console.log(pairs);
  return _.reduce(pairs, function(pair1, pair2) {
    return pair1[1] > pair2[1] ? pair1 : pair2;
  })[0];
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
  var stock_obj = stocks.gainAndLoss(data);
  var pairs = _.pairs(stock_obj);
  console.log(pairs);
  return _.reduce(pairs, function(pair1, pair2) {
    return pair1[1] < pair2[1] ? pair1 : pair2;
  })[0];
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
  var stock_obj = stocks.gainAndLoss(data);
  var pairs = _.pairs(stock_obj);
  console.log(pairs);
  return _.reduce(pairs, function(pair1, pair2) {
    return Math.abs(pair1[1]) > Math.abs(pair2[1]) ? pair1 : pair2;
  })[0];
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
stocks.portfolioValue = function (data, date, portfolio) {
  var currVals = {};

 _.forEach(data, function (stock) {
    if (new Date(stock["time"]).getTime() <= date.getTime()) {
      if (stock.ticker in currVals) {
        if (new Date(currVals[stock.ticker]["time"]).getTime() < new Date(stock["time"]).getTime())
          currVals[stock.ticker] = stock;
      } else {
        currVals[stock.ticker] = stock;
      }
    }
  });

 var arrPortfolio = _.pairs(portfolio);
  var portVal = 0;
  _.forEach(arrPortfolio, function (set) {
    portVal += currVals[set[0]]["price"] * set[1];
  });

 return portVal;
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
  var company_list = [];
  _.forEach(data, function(stock) {
    if (stock.ticker === ticker) {
        company_list.push([stock.price, stock.time])
    }
  });

  var max = [0, 0,-1000000000];
  for (var i=0; i < company_list.length; i++) {
    for (var j=0; j < company_list.length; j++) {
      if (company_list[i][0] - company_list[j][0] > max[2]) {
        if (new Date(company_list[i][1]).getTime() > new Date(company_list[j][1]).getTime()) {
          max[0] = new Date(company_list[j][1]);
          max[1] = new Date(company_list[i][1]);
          max[2] = company_list[i][0] - company_list[j][0]
        }
      }
    }
  }
  return max;
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
  var companies_list = [];
  _.forEach(data, function(stock) {
    if (companies_list.indexOf(stock.ticker) === -1) {
      companies_list.push(stock.ticker);
    }
  });

  var best_trades = [];
  _.forEach(companies_list, function(company) {
    var tmp = stocks.bestTrade(data, company);
    tmp.splice(0,0,company)
    best_trades.push(tmp)
  });
  return _.reduce(best_trades, function(comp1, comp2) {
    return comp1[3] > comp2[3] ? comp1 : comp2;
  });

};
