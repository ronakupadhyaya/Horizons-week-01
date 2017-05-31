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
stocks.createDate = function(dateStr) {
  return new Date(dateStr);
};

stocks.getTicker = function(data) {
  return data.ticker;
}

stocks.gainAndLoss = function(data) {
  // creating an object of different companies
  var newObj = _.groupBy(data, stocks.getTicker);
  var returnObj = {};
  //console.log(newObj);

  _.forEach(newObj, function(value, key) {
    value.sort(function(a, b) {
      //console.log("a.time is " + a.time + " and has type of " + typeof a.time);
      return stocks.createDate(a.time).getTime() - stocks.createDate(b.time).getTime();
      //converted a.time from string to Date object
      //converted this Date object to numbers
      //sorted the objects in the array based on this converted Date number
      // string --> Date --> number
    })
  })
  // the objects in value (array) has been sorted

  _.forEach(newObj, function(value, key) {
    returnObj[key] = value[value.length - 1].price - value[0].price;
  })

  return returnObj;

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
  var highestGainer = "";
  var largestGain = -Infinity;
  var newObj = this.gainAndLoss(data);

  _.forEach(newObj, function(value, key) {
    if (value > largestGain) {
      largestGain = value;
      highestGainer = key;
    }
  })
  return highestGainer;
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
  var lowestLoser = "";
  var biggestLoss = Infinity;
  var newObj = this.gainAndLoss(data);

  _.forEach(newObj, function(value, key) {
    if (value < biggestLoss) {
      biggestLoss = value;
      lowestLoser = key;
    }
  })
  return lowestLoser;
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
  var companyHistory = _.groupBy(data, stocks.getTicker);
  var craziestComp = "";
  var craziestRange = 0;

  _.forEach(companyHistory, function(value, key) {
    value.sort(function(a, b) {
      //console.log("a.time is " + a.time + " and has type of " + typeof a.time);
      return a.price - b.price;
    });
  });

  _.forEach(companyHistory, function(value, key) {
    var range = Math.abs(value[value.length - 1].price - value[0].price);
    if (range > craziestRange) {
      craziestRange = range;
      craziestComp = key;
    }
  })

  return craziestComp;

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

stocks.getUTCString = function(dateObj) {
  // YOUR CODE HERE
  var date = this.createDate(dateObj);
  return date.toUTCString();
};

stocks.portfolioValue = function(data, date, portfolio) {
  var numberDate = date.getTime();
  var portValue = 0;

  var datesObj = _.groupBy(data, function(element) {
    if (stocks.createDate(element.time).getTime() === numberDate) {
      return "date";
    }
    // grouping together all objects with the same date that we want
    return "notDate";
    // grouping everything else elsewhere into key "bad"
  })
  //console.log(datesObj);


  _.forEach(portfolio, function(val, key) {
    //going through each company you want to find the price for
    datesObj.date.forEach(function(element) {
      if (element.ticker === key) { //find the company you need in your portfolio
        portValue += element.price * val; //add the price * shares to your portfolio value
      }
    })
  })

  return portValue;


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
  var companyHistory = _.groupBy(data, stocks.getTicker); //separate the companies
  var tickerHistory = companyHistory[ticker];
  var largestRange = -Infinity;
  var buyingDateStr = "";
  var sellingDateStr = "";

  tickerHistory.sort(function(a, b) {
    //console.log("a.time is " + a.time + " and has type of " + typeof a.time);
    return stocks.createDate(a.time).getTime() - stocks.createDate(b.time).getTime();
    //converted a.time from string to Date object
    //converted this Date object to numbers
    //sorted the objects in the array based on this converted Date number
    // string --> Date --> number
  });


  for (var i = 0; i < tickerHistory.length - 1; i++) {
    for (var j = i + 1; j < tickerHistory.length; j++) {
      var range = tickerHistory[j].price - tickerHistory[i].price;
      //console.log(range);
      if (range > largestRange) {
        largestRange = range;
        buyingDateStr = tickerHistory[i].time;
        sellingDateStr = tickerHistory[j].time;
      }
    }
  }
  console.log([stocks.createDate(buyingDateStr), stocks.createDate(sellingDateStr), largestRange]);
  return [stocks.createDate(buyingDateStr), stocks.createDate(sellingDateStr), largestRange];

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
  var companyHistory = _.groupBy(data, stocks.getTicker); //separate the companies
  var greatestReturn = -Infinity;
  var returnArray = []

  _.forEach(companyHistory, function(value, key) {
    if (stocks.bestTrade(data, key)[2] > greatestReturn) {
      greatestReturn = stocks.bestTrade(value, key)[2];
      returnArray = [key].concat(stocks.bestTrade(data, key));
    }
  })

  return returnArray;
};
