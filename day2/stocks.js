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
  var firstLast = {}
  for (var trans = 0; trans < data.length; trans++) {
    data[trans].time = new Date(data[trans].time).getTime()
  }

  data.sort(function(a, b) {
    return a.time - b.time
  })

  for (var i = 0; i < data.length; i++) {
    if (_.isUndefined(firstLast[data[i].ticker])) {
      firstLast[data[i].ticker] = [data[i].price, 0]
    } else {
      firstLast[data[i].ticker][1] = data[i].price
    }
  }

  _.forEach(Object.keys(firstLast), function(ticker) {
    firstLast[ticker] = firstLast[ticker][1] - firstLast[ticker][0]
  })

  return firstLast

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
  var gains = stocks.gainAndLoss(data);
  gains = _.pairs(gains);
  gains = gains.sort(function(a, b) {
    return a[1] - b[1]
  });
  return gains[gains.length - 1][0]
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
  var gains = stocks.gainAndLoss(data);
  gains = _.pairs(gains);
  gains = gains.sort(function(a, b) {
    return a[1] - b[1]
  });
  return gains[0][0]
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
  var firstLast = {}
  for (var trans = 0; trans < data.length; trans++) {
    data[trans].time = new Date(data[trans].time).getTime()
  }

  data.sort(function(a, b) {
    return a.time - b.time
  })

  for (var i = 0; i < data.length; i++) {
    if (_.isUndefined(firstLast[data[i].ticker])) {
      firstLast[data[i].ticker] = [data[i].price, data[i].price]
    } else {
      if (firstLast[data[i].ticker][1] < data[i].price) {
        firstLast[data[i].ticker][1] = data[i].price
      } else if (firstLast[data[i].ticker][0] > data[i].price) {
        firstLast[data[i].ticker][0] = data[i].price
      }
    }
  }

  _.forEach(Object.keys(firstLast), function(ticker) {
    firstLast[ticker] = Math.abs(firstLast[ticker][1] - firstLast[ticker][0])
  })

  // firstLast.sort(function(a, b) {
  //   return a.price - b.price
  // })

  var max = ['', 0]
  _.forEach(Object.keys(firstLast), function(ticker) {
    if (firstLast[ticker] > max[1]) {
      max[0] = ticker
      max[1] = firstLast[ticker]
    }
  })
  return max[0]
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
  //console.log(_.groupBy(data, ticker))
  date = new Date(date).getTime()
  for (var trans = 0; trans < data.length; trans++) {
    data[trans].time = new Date(data[trans].time).getTime()
  }
  data.sort(function(a, b) {
    return a.time - b.time
  });
  var index = 0
  while (data[index].time <= date) {
    index += 1
    if (_.isUndefined(data[index])) {
      break
    }
  }
  // for (var trans = data.length-1; trans > 0; trans--) {
  //   if (data[trans].time >= date) {
  //     debugger;
  //     var x = trans
  //     break
  //   }
  // }
  data.splice(index + 1)
  var vals = {}

  for (var trans = data.length - 1; trans > 0; trans--) {
    if (_.isUndefined(vals[data[trans].ticker])) {
      vals[data[trans].ticker] = data[trans].price
    }
  }
  // debugger;
  portfolio = _.mapObject(portfolio, function(shares, company) {
    return shares * vals[company]
  })

  var total = 0
  _.forEach(Object.values(portfolio), function(price) {
    total += price
  })
  return total
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


  data = data.filter(function(trans) {
    if (trans.ticker === ticker) {
      return true
    }
    return false
  })


  // for (var i = 0; i < data.length; i++) {
  //   console.log(data[i].time, data[i].ticker, data[i].price)
  // }

  //console.log('*' + data.length)
  for (var trans = 0; trans < data.length; trans++) {
    data[trans].time = new Date(data[trans].time)
  }



  data = data.sort(function(a, b) {
    return a.time - b.time
  })









  var highLow = [data[0].price, data[0].price]
  var maxDiff = 0
  var idealDates = [0, 0]
  var currentDates = [data[0].time, data[0].time]
  for (var index = 0; index < data.length - 1; index++) {
  //   //currentDates[0] = data[index].time
  //   for (var index2 = index + 1; index2 < data.length; index2++) {
  //     //currentDates[1] = data[index2].time
  //     if ((data[index2].price - data[index].price) > maxDiff) {
  //       maxDiff = data[index2].price - data[index].price
  //       idealDates = [data[index].time, data[index2].time]
  //     }
  //   }
    if (data[index].price < highLow[0]) {
      highLow = [data[index].price, data[index].price]
      currentDates = [data[index].time, data[index].time]
    }
    if (data[index].price > highLow[1]) {
      highLow[1] = data[index].price
      if (highLow[1] - highLow[0] > maxDiff) {
        maxDiff = highLow[1] - highLow[0]
        currentDates[1] = data[index].time
        idealDates = currentDates.slice()
      } else {
        currentDates[1] = data[index].time
      }
    }
  }
  return [idealDates[0], idealDates[1], maxDiff]
}


  //return [new Date(idealDates[0]), new Date(idealDates[1]), maxDiff];


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
