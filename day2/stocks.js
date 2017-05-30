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
  var byCompany = _.groupBy(data, function(company) {
    return company.ticker;
  });
  var gainAndLoss = {};
  for (var key in byCompany) {
    var difference;
    var maxDate = new Date(0);
    var latestPrice = 0;
    for (var i = 0; i < byCompany[key].length; i++) {
      var date = byCompany[key][i];
      var currentDate = new Date(date.time);
      if (currentDate > maxDate) {
        maxDate = currentDate;
        latestPrice = date.price;
      }
    }

    var dateObj = new Date();
    var minDate = dateObj.setDate(dateObj.getDate() + 1);
    var earliestPrice = 0;
    for (var j = 0; j < byCompany[key].length; j++) {
      date = byCompany[key][j];
      currentDate = new Date(date.time);
      if (currentDate < minDate) {
        minDate = currentDate;
        earliestPrice = date.price;
      }
    }
    gainAndLoss[key] = latestPrice - earliestPrice;
  }
  return gainAndLoss;
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
  var companies = stocks.gainAndLoss(data);
  var max = -1/0;
  var company = "";
  for (var key in companies) {
    if (companies.hasOwnProperty(key)) {
      if (companies[key] > max) {
        max = companies[key];
        company = key;
      }
    }
  }
  return company;
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
  var companies = stocks.gainAndLoss(data);
  var min = 1/0;
  var company = "";
  for (var key in companies) {
    if (companies.hasOwnProperty(key)) {
      if (companies[key] < min) {
        min = companies[key];
        company = key;
      }
    }
  }
  return company;
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
  var companies = stocks.gainAndLoss(data);
  var companies = _.map(companies, function(company, index) {
    return [Math.abs(company), index];
  });
  companies.sort(function (a, b) {
    return b[0] - a[0];
  });
  return companies[0][1];
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
  var byDate = _.groupBy(data, function(company) {
    var date = new Date(company.time);
    return date;
  });

  var timeArray = [];

  for (var time in byDate) {
    if (byDate.hasOwnProperty(time)) {
      if (time.toString() === date.toString()) {
        timeArray = byDate[time];
      }
    }
  }
  var sum = 0;
  _.map(portfolio, function(number, stock) {
    for (var i = 0; i < timeArray.length; i++) {
      if (timeArray[i].ticker === stock) {
        sum += timeArray[i].price * number;
      }
    }
  });
  // console.log(sum);
  return sum;
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
  var co = _.filter(_.groupBy(data, function(company) {
    return company.ticker;
  }), function(value, companyName) {
    return companyName === ticker;
  })[0];

  co.sort(function(a, b) {
    if (new Date(a.time) > new Date(b.time)){
      return 1;
    }
    if (new Date(a.time) < new Date(b.time)){
      return -1;
    }
    return 0;
  })

  var startDate;
  var endDate;
  var maxDifference = 0
  for (var start = 0; start < co.length; start++) {
    for (var end = start + 1; end < co.length; end ++) {
      if (co[end].price - co[start].price > maxDifference){
        startDate = new Date(co[start].time)
        endDate = new Date(co[end].time)
        maxDifference = co[end].price - co[start].price
      }
    }
  }
  // console.log([startDate, endDate, maxDifference])
  return [startDate, endDate, maxDifference]
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
  var co = _.groupBy(data, function(company) {
    return company.ticker;
  });
  var arr = []
  for (var key in co){
    if (co.hasOwnProperty(key)){
      arr.push([key, stocks.bestTrade(data, key)])
    }
  }
  console.log(arr)
  arr.sort(function(a,b) {
    return b[1][2] - a[1][2]
  })
  // console.log(arr)
  return [arr[0][0], new Date(arr[0][1][0]), new Date(arr[0][1][1]), arr[0][1][2]]
};





