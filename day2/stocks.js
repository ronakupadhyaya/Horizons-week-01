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

  var group = _.groupBy(data, function (transaction) {
    return transaction.ticker;
  })
  // console.log(group);
  function findEarliest (transactions){
    return transactions.reduce(function (earliest, current){
      return earliest.time < current.time ? earliest: current;
    })
  }
  function findLatest (transactions){
    return transactions.reduce(function (latest, current){
      return latest.time > current.time ? latest: current;
    })
  }
  return _.mapObject(group, function (val, key){
    return findLatest(val).price - findEarliest(val).price
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
  var object = stocks.gainAndLoss(data);
  var biggestGain = -5000;
  var gainCom = data[0].ticker;
  _.forEach(object, function (val, key){
    if (val > biggestGain) {
      biggestGain = val;
      gainCom = key;

    }
  })
  return gainCom;


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
  var object = stocks.gainAndLoss(data);
  var biggestGain = +5000;
  var gainCom = data[0].ticker;
  _.forEach(object, function (val, key){
    if (val < biggestGain) {
      biggestGain = val;
      gainCom = key;

    }
  })
  return gainCom;

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
  var group = _.groupBy(data, function (transaction) {
    return transaction.ticker;
  })
  // console.log(group);
  function findCheapest (transactions){
    return transactions.reduce(function (earliest, current){
      return earliest.price < current.price ? earliest: current;
    })
  }
  function findPricest (transactions){
    return transactions.reduce(function (latest, current){
      return latest.price > current.price ? latest: current;
    })
  }
  var group2 = _.mapObject(group, function (val, key){
    return findPricest(val).price - findCheapest(val).price
  })

  var biggestRange = -5000;
  var rangeCom = data[0].ticker;
  _.forEach(group2, function (val, key){
    if (val > biggestRange) {
      biggestRange = val;
      rangeCom = key;

    }
  })
  return rangeCom;

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
  var group = _.groupBy (data, function (transaction){
    return transaction.ticker;
  });
  function findDate (transactions){
    var closest = transactions[0];
    var closestTime = new Date(transactions[0].time);

    for (var i = 0; i < transactions.length; i++) {
      var currentTime = new Date(transactions[i].time);
      if (currentTime.getTime() === date.getTime()) {
        return transactions[i];
      }
    }
    return -1000;
  }
  function findNum(com){
    var stock = 0;
    _.forEach(portfolio, function(val, key){
      if (key === com.ticker){
        stock = val;
      }
    })
    return stock;
  }
  var sum = 0;
  _.forEach(group, function (val, key){
    var transaction = findDate(val);
    sum = sum + transaction.price * findNum(transaction);
  })
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
  // sort data by group
  var group = _.groupBy(data, function (transaction) {
    return transaction.ticker;
  });
  //get transactions of company ticker
  var transactions = [];
  _.forEach(group, function(val, key) {
    if (key === ticker) {
      console.log(key);
      transactions = val;
    }
  })
  //sort transactions by time via merge sort
  transactions = stocks.sortByTime(transactions);
  //nested for loop to find s and e times of greatest price range
  var range = 0;
  var startTime = null;
  var endTime = null;
  for (var s = 0; s<transactions.length; s++) {
    var sP = transactions[s].price;
    for (var e = s; e<transactions.length; e++) {
      var eP = transactions[e].price;

      if (eP-sP > range) {
        range = eP-sP;
        startTime = transactions[s].time;
        endTime = transactions[e].time;
      }
    }
  }

  return [new Date(startTime), new Date(endTime), range];

};

stocks.sortByTime = function(transactions) {
  function mergeSort(transactions) {
    if (transactions.length < 2) {
      return transactions;
    }

    var middle = parseInt(transactions.length/2);
    var left = transactions.slice(0, middle);
    var right = transactions.slice(middle, transactions.length);

    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
      if (new Date(left[0].time).getTime() <= new Date(right[0].time).getTime()) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    while (left.length) {
      result.push(left.shift());
    }
    while (right.length) {
      result.push(right.shift());
    }
    return result;
  }

  return mergeSort(transactions);
}
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
  //sort data by company
  var group = _.groupBy(data, function(transaction) {
    return transaction.ticker;
  });
  //compare each company's best trade; save/replace values for the best one
  var bestCO = [];
  var bestTrans = [0, 0, 0];
  _.forEach(group, function(val, key) {
    var arr = stocks.bestTrade(data, key);
    if (arr[2] > bestTrans[2]) {
      bestCO[0] = key;
      bestTrans = arr;
    }
  })

  return bestCO.concat(bestTrans);
};
