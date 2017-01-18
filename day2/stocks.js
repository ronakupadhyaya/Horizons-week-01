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
  var groupStocks = _.groupBy(data, function(item) {
    return item.ticker;
  });
  var sortedTime = _.mapObject(groupStocks, function(item) {
    var sorted = item.sort(function(a, b) {
      var aTemp = new Date(a.time);
      var bTemp = new Date(b.time);
      return aTemp.getTime() - bTemp.getTime();
    });
    return sorted;
  });
  var gainLoss = _.mapObject(sortedTime, function(item) {
    return item[item.length - 1].price - item[0].price;
  });
  return gainLoss;
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
  var obj = stocks.gainAndLoss(data);
  var highest = _.reduce(stocks.getValues(obj), function(a, b) {
    return a > b ? a : b;
  })
  for (var key in obj) {
    if (highest === obj[key]) {
      return key;
    }
  }
};

stocks.getValues = function(object) {
  var arr = [];
  _.forEach(object, function(value, key) {
    arr.push(value);
  });
  return arr;
}
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
  var obj = stocks.gainAndLoss(data);
  var lowest = _.reduce(stocks.getValues(obj), function(a, b) {
    return a < b ? a : b;
  })
  for (var key in obj) {
    if (lowest === obj[key]) {
      return key;
    }
  }
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
  var groupStocks = _.groupBy(data, function(item) {
    return item.ticker;
  });
  var sortedPrice = _.mapObject(groupStocks, function(item) {
    var sorted = item.sort(function(a, b) {
      return a.price - b.price;
    });
    return sorted;
  });
  var gainLoss = _.mapObject(sortedPrice, function(item) {
    return item[item.length - 1].price - item[0].price;
  });
  var lowest = _.reduce(gainLoss, function(a, b) {
    return a > b ? a : b;
  })
  for (var key in gainLoss) {
    if (lowest === gainLoss[key]) {
      return key;
    }
  }
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
  var groupStocks = _.groupBy(data, function(item) {
    return item.ticker;
  });
  var prices = {};
  for (var key in groupStocks) {
    for (var i = 0; i < groupStocks[key].length; i++) {
      var dateTemp = new Date(groupStocks[key][i].time);
      if (date.getTime() === dateTemp.getTime()) {
        prices[key] = groupStocks[key][i].price;
      }
    }
  }
  var sum = 0;
  for (var key in portfolio) {
    sum += portfolio[key] * prices[key];
  }
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
  var items = [];
  //sorts into the company names
  var groupStocks = _.groupBy(data, function(item) {
    return item.ticker;
  });

  //sorts the arrays by price
  //ACTUALLY PRICE!!
  var sortedDate = _.mapObject(groupStocks, function(item) {
    var sorted = item.sort(function(a, b) {
      return a.price - b.price;
    });
    return sorted;
  });

  //take the array sorted by price, then check
  for (var i = 0; i < sortedDate[ticker].length; i++) {
    var breaker = false;
    for (var j = sortedDate[ticker].length - 1; j >= 0; j--) {
      if (sortedDate[ticker][j].time > sortedDate[ticker][i].time) {
        items.push(new Date(sortedDate[ticker][i].time));
        items.push(new Date(sortedDate[ticker][j].time));
        items.push(sortedDate[ticker][j].price - sortedDate[ticker][i].price);
        breaker = true;
        break;
      }
      if (breaker) {
        break;
      }
    }
    return items;
  }
  items.push(new Date(sortedPrice[ticker][0].time));
  items.push(new Date(sortedPrice[ticker][sortedPrice[ticker].length - 1].time));
  items.push(sortedPrice[ticker][sortedPrice[ticker].length - 1].price -
    sortedPrice[ticker][0].price);
  return items;
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
  var items = [];
  //sorts into the company names
  var groupStocks = _.groupBy(data, function(item) {
    return item.ticker;
  });

  //sorts the arrays by price
  //ACTUALLY PRICE!!
  var sortedDate = _.mapObject(groupStocks, function(item) {
    var sorted = item.sort(function(a, b) {
      return a.price - b.price;
    });
    return sorted;
  });
  var prices = {};
  //take the array sorted by price, then check
  for (var key in sortedDate) {
    for (var i = 0; i < sortedDate[key].length; i++) {
      var breaker = false;
      for (var j = sortedDate[key].length - 1; j >= 0; j--) {
        if (sortedDate[key][j].time > sortedDate[key][i].time) {
          items.push(key);
          items.push(new Date(sortedDate[key][i].time));
          items.push(new Date(sortedDate[key][j].time));
          items.push(sortedDate[key][j].price - sortedDate[key][i].price);
          prices[key] = items;
          breaker = true;
          items = [];
          break;
        }
      }
      if (breaker) {
        break;
      }
    }
  }

  var keys = Object.keys(prices);
  var temp = prices[keys[0]];
  for (var i = 1; i < keys.length; i++) {
    console.log(prices[keys[i]][3]);
    if (temp[3] < prices[keys[i]][3]) {
      temp = prices[keys[i]];
    }
  }
  return temp;
};
