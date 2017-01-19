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
  var netGains={};
  var timeDifference = _.groupBy(data, function(stocks) {
    return stocks.ticker;
  })
  var timer = _.mapObject(timeDifference, function(arr, key) {
    for (var i=0;i<arr.length;i++) {
      arr[i].time = new Date(arr[i].time);
    }
    return arr;
  })
  _.forEach(timer, function(val, key) {
    val.sort(function(a,b) {
      return a.time - b.time;
    })
  })
  _.forEach(timer, function(val, key) {
    netGains[key] = val[val.length - 1].price - val[0].price
  })
  return netGains;
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
  var maxVal = 0;
  var maxTx;
  _.forEach(companies, function(val, key) {
    if(val > maxVal) {
      maxVal = val;
      maxTx = key;
    }
  })
  return maxTx;
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
  var minVal = Infinity;
  var minTx;
  _.forEach(companies, function(val, key) {
    if(val < minVal) {
      minVal = val;
      minTx = key;
    }
  })
  return minTx;
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
  var tradingRange={};
  var priceDifference = _.groupBy(data, function(stocks) {
    return stocks.ticker;
  })
  _.forEach(priceDifference, function(val, key) {
    val.sort(function(a,b) {
      return a.price - b.price;
    })
  })
  _.forEach(priceDifference, function(val, key) {
    tradingRange[key] = val[val.length - 1].price - val[0].price
  })
  var maxVal = 0;
  var maxTx;
  _.forEach(tradingRange, function(val, key) {
    if(val > maxVal) {
      maxVal = val;
      maxTx = key;
    }
  })
  return maxTx;
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
  var timeDifference = _.groupBy(data, function(stocks) {
    return stocks.time;
  })
  var timer = _.mapObject(timeDifference, function(arr, key) {
    for (var i=0;i<arr.length;i++) {
      arr[i].time = new Date(arr[i].time);
    }
    return arr;
  })
  var portVal = 0;
  _.forEach(portfolio, function(val, key) {
    for(var a=0;a<timeDifference[date].length;a++) {
      if(key === timeDifference[date][a].ticker) {
        portVal += timeDifference[date][a].price*portfolio[key]
      }
    }
  })
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
  var timeDifference = _.groupBy(data, function(stocks) {
    return stocks.ticker;
  })
  var timer = _.mapObject(timeDifference, function(arr, key) {
    for (var i=0;i<arr.length;i++) {
      arr[i].time = new Date(arr[i].time);
    }
    return arr;
  })
  _.forEach(timer, function(val, key) {
    val.sort(function(a,b) {
      return a.time - b.time;
    })
  })
  console.log(timer)
  var valDiff = 0;
  var buyDate;
  var sellDate;
  var bestTrade = [];
  for(var i=0;i<timer[ticker].length;i++) {
    for(var x=i;x<timer[ticker].length;x++) {
      if(timer[ticker][x].price - timer[ticker][i].price > valDiff) {
        buyDate = timer[ticker][i].time
        sellDate = timer[ticker][x].time
        valDiff = timer[ticker][x].price - timer[ticker][i].price
      }
    }
  }
  bestTrade.push(buyDate)
  bestTrade.push(sellDate)
  bestTrade.push(valDiff)
  console.log(bestTrade);
  return bestTrade;
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
  var comp = ['GOOG', 'NFLX', 'FB', 'MSFT', 'AMZN', 'NVDA']
  var bestVal =[];
  var bestTradeEvr =[];
  var tempVal = 0;
  for(var i=0;i<comp.length;i++) {
    bestVal.push(stocks.bestTrade(data,comp[i]))
  }
  for (var x=0;x<bestVal.length;x++) {
    if (bestVal[x][2] > tempVal) {
      tempVal = bestVal[x][2]
    }
  }
  for(var y=0;y<bestVal.length;y++) {
    if(bestVal[y][2] === tempVal) {
      bestTradeEvr.push(comp[y])
      for (var a=0;a<3;a++) {
        bestTradeEvr.push(bestVal[y][a])
      }
    }
  }
  console.log(bestTradeEvr)
  return bestTradeEvr;
};
