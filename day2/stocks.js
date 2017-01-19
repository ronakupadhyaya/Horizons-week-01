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
var sortByDate = _.sortBy(data, "time")
var sortByTicker = _.groupBy(sortByDate, "ticker")
var finalresult = {"AMZN": 0, "FB": 0, "GOOG": 0, "MSFT": 0, "NFLX": 0, "NVDA": 0}
finalresult.AMZN = sortByTicker.AMZN[29].price- sortByTicker.AMZN[0].price;
console.log(finalresult.AMZN);

finalresult.FB = sortByTicker.FB[29].price- sortByTicker.FB[0].price;
console.log(finalresult.FB);

finalresult.GOOG = sortByTicker.GOOG[29].price- sortByTicker.GOOG[0].price;
console.log(finalresult.GOOG);

finalresult.MSFT = sortByTicker.MSFT[29].price- sortByTicker.MSFT[0].price;
console.log(finalresult.AMZN);

finalresult.NFLX = sortByTicker.NFLX[29].price- sortByTicker.NFLX[0].price;
console.log(finalresult.NFLX);

finalresult.NVDA = sortByTicker.NVDA[29].price- sortByTicker.NVDA[0].price;
console.log(finalresult.NVDA);

return finalresult;
  };

// ._forEach(data.ticker.date[data.date.length])
// ticker.date[0]
//
// find the most recent price of each company
// find the earliest price of each company
// subtract the first line with the second line and print the result for each individual stocks
// };

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
var max = stocks.gainAndLoss(data);
var arr = [];
for (var key in max) {
  arr.push([key, max[key]])
}
arr.sort(function(a,b) {
  return b[1] - a[1]
})
return arr[0][0]
};

// console.log(max)
// var newest = _.sortBy(max);
// var largest = newest[newest.length-1]
// console.log(largest)
//
// var index1 = _.indexBy(max, 'AMZN')
// console.log(index1)


// console.log(max)

// var index = _.indexBy(max, "largest")
// console.log(index)
// for (var i=0; i<max.length; i++)
// if (largest) === _.map[i]

// return x;


//
// var x = {"class1": 0, "class2": 0}
// _.forEach(data, function (a) {
//   x.class1 += a.grades.class1
//   x.class2 += a.grades.class2
// })

// x.class1 = x.class1/data.length
// x.class2 = x.class2/data.length
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
  var max = stocks.gainAndLoss(data);
  var arr = [];
  for (var key in max) {
    arr.push([key, max[key]])
  }
  arr.sort(function(a,b) {
    return a[1] - b[1]
  })
  return arr[0][0]
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
  var sortByDate = _.sortBy(data, "price")
  var sortByTicker = _.groupBy(sortByDate, "ticker")
  var finalresult = {"AMZN": 0, "FB": 0, "GOOG": 0, "MSFT": 0, "NFLX": 0, "NVDA": 0}
  finalresult.AMZN = sortByTicker.AMZN[29].price- sortByTicker.AMZN[0].price;

  finalresult.FB = sortByTicker.FB[29].price- sortByTicker.FB[0].price;

  finalresult.GOOG = sortByTicker.GOOG[29].price- sortByTicker.GOOG[0].price;

  finalresult.MSFT = sortByTicker.MSFT[29].price- sortByTicker.MSFT[0].price;

  finalresult.NFLX = sortByTicker.NFLX[29].price- sortByTicker.NFLX[0].price;

  finalresult.NVDA = sortByTicker.NVDA[29].price- sortByTicker.NVDA[0].price;
  console.log(finalresult)
  var arr = [];
  for (var key in finalresult) {
    arr.push([key, finalresult[key]])
  }
  arr.sort(function(a,b) {
    return b[1] - a[1]
  })
  return arr[0][0]
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
  // var sortByDate = _.groupBy(data, "time")
  // var newdate = date.toISOString();
  // var need = sortByDate.newdate
  // var keys = Object.keys[portfolio]
  // for (var j = 0; j < need.length; j++) {
  //   }
  //   for (var i=0; i < )

var groupByDate = _.groupBy(data, "time");
var value = 0;
var amounts = [];
var newDate = date.toISOString();
var keyList = Object.keys(portfolio);
for (var x = 0; x < keyList.length; x++) {
  var price = 0;
  for (var i = 0; i < groupByDate[newDate].length; i++) {
    if (groupByDate[newDate][i].ticker === keyList[x]) {
      price = groupByDate[newDate][i].price;
    }
  }
  var oneValue = price * portfolio[keyList[x]];
  amounts.push(oneValue);
}
value = amounts.reduce(function(a,b) {
  return a + b;
});
return value;
};

  // for (var key in need) {
  //   arr.push(key, need[key])
  // }
  // console.key
  // price[0], ticker[0]
  // console.log(need)

  // _forEach(sortByDate, function(date) {
  //     if (sortByDate.time === (newdate)) {
  //       arr.push(sortByDate)
  //     }
  // })
  // console.log(arr)
  // arr.push(sortByDate.time)

  // var sortByDate = _.sortBy(data, "ticker")
  // var sortByTicker = _.groupBy(sortByDate, "date")
  // console.log(sortByDate)
// };
//   var finalresult = {"AMZN": 0, "FB": 0, "GOOG": 0, "MSFT": 0, "NFLX": 0, "NVDA": 0}


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
  var sortByDate = _.sortBy(data, "time")
  var sortByTicker = _.groupBy(sortByDate, "ticker")
  // var sortByTicker = _.groupBy(sortByDate, "price")
  console.log(sortByTicker)
  // var finalresult = {"AMZN": 0, "FB": 0, "GOOG": 0, "MSFT": 0, "NFLX": 0, "NVDA": 0}
  // finalresult.AMZN = sortByTicker.AMZN[29].price- sortByTicker.AMZN[0].price;
  // console.log(finalresult.AMZN);

  //buy at the minimum price (prior to the maximum price occuring) for each ticker
  //sell at the maximum price
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
