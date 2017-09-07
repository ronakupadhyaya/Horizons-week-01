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
  var companyStocks = _.groupBy(data, function(trans) {
    return trans.ticker;
  });
  var companies = _.keys(companyStocks);
  var companyHistory = {}; //key: companyName, value: array of transactions for that company
  _.forEach(companies, function(company) {
    companyHistory[company] = companyStocks[company];
  });

  // finds earliest transaction from array of transactions "history"
  var early = function(history) {
    var earliest = _.reduce(history, function(trans1, trans2) {
      if (trans1.time < trans2.time) { // trans1 is earlier in this case
        return trans1;
      }
      return trans2;
    });
    return earliest;
  }

  // finds latest transaction from array of transactions "history"
  var late = function(history) {
    var latest = _.reduce(history, function(trans1, trans2) {
      if (trans1.time > trans2.time) { // trans1 is later in this case
        return trans1;
      }
      return trans2;
    });
    return latest;
  }

  var ret = {};

  _.forEach(companies, function(company) {
    ret[company] = late(companyHistory[company]).price - early(companyHistory[company]).price;
  });

  return ret;
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
  var stockChanges = stocks.gainAndLoss(data);
  var companies = _.keys(stockChanges);
  var companyChanges = []; // will contain {name: 'Company', change: #}
  _.forEach(companies, function(company) {
    companyChanges.push( {name: company, change: stockChanges[company]} );
  });
  var bigGain = _.reduce(companyChanges, function(ticker1, ticker2) {
    if(ticker1.change > ticker2.change) {
      return ticker1;
    }
    return ticker2;
  });
  return bigGain.name;
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
  var stockChanges = stocks.gainAndLoss(data);
  var companies = _.keys(stockChanges);
  var companyChanges = []; // will contain {name: 'Company', change: #}
  _.forEach(companies, function(company) {
    companyChanges.push( {name: company, change: stockChanges[company]} );
  });
  var bigLoss = _.reduce(companyChanges, function(ticker1, ticker2) {
    if(ticker1.change < ticker2.change) {
      return ticker1;
    }
    return ticker2;
  });
  return bigLoss.name;
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
  var companyStocks = _.groupBy(data, function(trans) {
    return trans.ticker;
  });
  var companies = _.keys(companyStocks);
  var companyHistory = {}; //key: companyName, value: array of transactions for that company
  _.forEach(companies, function(company) {
    companyHistory[company] = companyStocks[company];
  });

  // finds lowest value transaction from array of transactions "history"
  var lower = function(history) {
    var lowest = _.reduce(history, function(trans1, trans2) {
      if (trans1.price < trans2.price) { // trans1 is lower in value in this case
        return trans1;
      }
      return trans2;
    });
    return lowest;
  }

  // finds highest value transaction from array of transactions "history"
  var higher = function(history) {
    var highest = _.reduce(history, function(trans1, trans2) {
      if (trans1.price > trans2.price) { // trans1 is higher in value in this case
        return trans1;
      }
      return trans2;
    });
    return highest;
  }

  var ret = {};

  _.forEach(companies, function(company) {
    ret[company] = higher(companyHistory[company]).price - lower(companyHistory[company]).price;
  });

  var stockChanges = ret;
  var companies = _.keys(stockChanges);
  var companyChanges = []; // will contain {name: 'Company', change: #}
  _.forEach(companies, function(company) {
    companyChanges.push( {name: company, change: stockChanges[company]} );
  });
  var volatile = _.reduce(companyChanges, function(ticker1, ticker2) {
    if(ticker1.change > ticker2.change) {
      return ticker1;
    }
    return ticker2;
  });
  return volatile.name;
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
  var convertedDate = date.toISOString();
  var dayValue = _.filter(data, function(trans) { //array of transactions for that day
    return trans.time === convertedDate;
  });
  debugger;
  var tickerPrices = {}; // { 'ticker': price }
  _.forEach(dayValue, function(trans) {
    tickerPrices[trans.ticker] = trans.price;
  });
  var portTickers = _.keys(portfolio); //tickers from the portfolio
  var totalWorth = 0;
  _.forEach(portTickers, function(ticker) {
    totalWorth += tickerPrices[ticker] * portfolio[ticker];
  });
  return totalWorth;
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
  // filter data to only include ticker


  // sort transactions by time

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
