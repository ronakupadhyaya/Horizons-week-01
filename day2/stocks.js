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
  var stockNames = _.groupBy(data, function(stock) {
    return stock.ticker
  })

  for (var stock in stockNames) {
    var stockTimes = []
    var beginningPrice;
    var endingPrice;
    stockNames[stock].forEach(function (stock) {
      stockTimes.push(stock.time)
    })
    var earliest = stockTimes.reduce(function(a,b) {
      return a < b ? a : b
    })
    var latest = stockTimes.reduce(function (a,b) {
      return a > b ? a : b
    })

    for (var i = 0; i < stockNames[stock].length; i++) {
      if (stockNames[stock][i].time === earliest) {
        beginningPrice = stockNames[stock][i].price;
      } else if (stockNames[stock][i].time === latest) {
        endingPrice = stockNames[stock][i].price;
      }
    }
    var priceDifference = endingPrice - beginningPrice
    stockNames[stock] = priceDifference;
  }
  return stockNames;

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
  var gainAndLoss = stocks.gainAndLoss(data)
  var bestCompany = Object.keys(gainAndLoss)[0];
  for (var key in gainAndLoss) {
    if (gainAndLoss[bestCompany] < gainAndLoss[key]) {
      bestCompany = key;
    }
  }
  return bestCompany;
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
  var gainAndLoss = stocks.gainAndLoss(data)
  var worstCompany = Object.keys(gainAndLoss)[0];
  for (var key in gainAndLoss) {
    if (gainAndLoss[worstCompany] > gainAndLoss[key]) {
      worstCompany = key;
    }
  }
  return worstCompany;
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
  var stockNames = _.groupBy(data, function(stock) {
    return stock.ticker
  })
  for (var stock in stockNames) {
    var stockPrice = []
    stockNames[stock].forEach(function (stock) {
      stockPrice.push(stock.price)
    })
    var lowest = stockPrice.reduce(function(a,b) {
      return a < b ? a : b
    })
    var highest = stockPrice.reduce(function (a,b) {
      return a > b ? a : b
    })

    var priceDifference = highest - lowest
    stockNames[stock] = priceDifference;
  }
  var widestCompany = Object.keys(stockNames)[0];
  for (var key in stockNames) {
    if (stockNames[widestCompany] < stockNames[key]) {
      widestCompany = key;
    }
  }
  return widestCompany;
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
  var stockNames = _.groupBy(data, function(stock) {
    return stock.ticker
  })
  var totalPrice = 0;
  for (var ticker in portfolio) {
    stockNames[ticker].forEach(function(stock) {
      var currentDate = new Date(stock.time)
      if (date - currentDate === 0) {
        totalPrice = totalPrice + portfolio[ticker]*stock.price;
      }
    })
  }
  return totalPrice
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

  //done by Jing

  var stockNames = _.groupBy(data, function(stock) {
    return stock.ticker
  });
  var currentStock = stockNames[ticker]
  var stockPrice = [];
  var compareArr = [];
  var returnArr = [];
  for (var i = 0; i < currentStock.length; i++) {
    for (var j = 0; j < currentStock.length; j++) {
      var differentPrice = currentStock[j].price - currentStock[i].price
      var buyDate = new Date(currentStock[i].time)
      var sellDate = new Date(currentStock[j].time)
      var differentDate = sellDate - buyDate
      if (differentPrice > 0 && differentDate > 0 ) {
        var comparePrice = {};
        comparePrice.differentPrice = differentPrice;
        comparePrice["buyDate"] = currentStock[i].time;
        comparePrice["sellDate"] = currentStock[j].time;
        compareArr.push(comparePrice)
      }
    }
  }
  var allDifferences = []
  compareArr.forEach(function(number) {
    allDifferences.push(number.differentPrice)
  })

  var highestDifference = allDifferences.reduce(function(a,b) {
    return a > b ? a : b
  });

  for (var i = 0; i < compareArr.length; i++) {
    if (highestDifference === compareArr[i].differentPrice) {
      returnArr.push(new Date(compareArr[i].buyDate))
      returnArr.push(new Date(compareArr[i].sellDate))
      break;
    }
  }
  returnArr.push(highestDifference)
  console.log(returnArr)
  return returnArr
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

};
