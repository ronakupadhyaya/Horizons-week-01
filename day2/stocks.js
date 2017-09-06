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
  var groupedData = _.groupBy(data, function(stock){
    return stock.ticker;
  });
  var returnObj = {}
  var newObj = _.mapObject(groupedData, function(element, key){
    var earliestStock = element.reduce(function(a, b){
      var aDate = new Date(a.time);
      var bDate = new Date(b.time);
      if(aDate > bDate){
        return b;
      }
      return a;
    });

    var latestStock = element.reduce(function(a, b){
      var aDate = new Date(a.time);
      var bDate = new Date(b.time);
      if(aDate > bDate){
        return a;
      }
      return b;
    })

    returnObj[key] = latestStock.price - earliestStock.price;
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
  var gainObj = stocks.gainAndLoss(data);
  var largest = '';
  var total = -Infinity;
  _.forEach(gainObj, function(value, key, list){
    if(value > total){
      total = value;
      largest = key;
    }
  })
  return largest;
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
  var gainObj = stocks.gainAndLoss(data);
  var largest = '';
  var total = Infinity;
  _.forEach(gainObj, function(value, key, list){
    if(value <  total){
      total = value;
      largest = key;
    }
  })
  return largest;
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
  var groupedData = _.groupBy(data, function(stock){
    return stock.ticker;
  });
  var returnObj = {}
  var newObj = _.mapObject(groupedData, function(element, key){
    var lowestPrice = element.reduce(function(a, b){

      if(a.price > b.price){
        return b;
      }
      return a;
    });

    var highestPrice = element.reduce(function(a, b){
      if(a.price > b.price){
        return a;
      }
      return b;
    })

    returnObj[key] = highestPrice.price - lowestPrice.price;
  });
  var largest = '';
  var total = -Infinity;
  _.forEach(returnObj, function(value, key, list){
    if(value >  total){
      total = value;
      largest = key;
    }
  })
  return largest;
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
function isSameTimeOfDay(dateObj, otherDateObj){
  return dateObj.getDate() === otherDateObj.getDate();
}
stocks.portfolioValue = function(data, date, portfolio) {
  var total = 0;

  _.forEach(portfolio, function(value, key, list){
    var stock = data.filter(function(item){
      var itemDate = new Date(item.time);
      return item.ticker === key && isSameTimeOfDay(itemDate, date);
    });

    total += stock[0].price * value;
  })
  return total;
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
  var groupedData = _.groupBy(data, function(stock){
    return stock.ticker;
  });

  var relevantArray = groupedData[ticker];
  function compareFunction(a, b){
    var aDate = new Date(a.time);
    var bDate = new Date(b.time);
    if(aDate > bDate){
      return 1;
    }
    if(aDate < bDate){
      return -1;
    }

    return 0;
  }
  relevantArray.sort(compareFunction);
  var maximum = -Infinity;
  var lowestTime;
  var highestTime;
  for(var i = 0; i < relevantArray.length; i++){
    for(var j = i+1; j<relevantArray.length; j++){
      var currentRange = relevantArray[j].price - relevantArray[i].price;
      if(currentRange > maximum){
        maximum = currentRange;
        lowestTime = relevantArray[i].time;
        highestTime = relevantArray[j].time;
      }
    }
  }
  return [new Date(lowestTime), new Date(highestTime), maximum];

  // console.log([new Date(lowestPrice.time), new Date(highestPrice.time), highestPrice.price - lowestPrice.price]);
  // return [new Date(lowestPrice.time), new Date(highestPrice.time), highestPrice.price - lowestPrice.price];
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
  var maximum = -Infinity;
  var bestStock = '';
  var bestObj;
  var groupedData = _.groupBy(data, function(stock){
    return stock.ticker;
  });

  _.forEach(groupedData, function(value, key, list){
    var moneyAchieved = stocks.bestTrade(data, key);
    console.log(moneyAchieved);
    if(moneyAchieved[2] > maximum){
      maximum = moneyAchieved[2];
      bestStock = key;
      bestObj = moneyAchieved;
    }
  })
  return [bestStock].concat(bestObj);
};
