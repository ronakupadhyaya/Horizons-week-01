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
stocks.gainAndLoss = function (data) {
  // YOUR CODE HERE
  var NewObject = {};
  var arr = _.groupBy(data, function (stock) {
    return stock.ticker;
  });
  //console.log(arr);
  arr = _.forEach(arr, function (stock) {
    //console.log("stock", stock)
    stock.sort(function (a, b) {
      //  console.log("time diffrence", Date.parse(a.time) - Date.parse(b.time))
      return Date.parse(a.time) - Date.parse(b.time);
      /*  var tmpDate1 = new Date(a.time);
        var tmpDate2 = new Date(b.time);
        tmpDate1 = tmpDate1.getMilliseconds();
        console.log("time in mili" + Date.parse(a.time));
        tmpDate2 = tmpDate2.getMilliseconds();
        console.log("time diffrence", tmpDate1 - tmpDate2)*/

    });


    arr = _.forEach(arr, function (stock) {
      var sumDif = stock[stock.length - 1].price;
      sumDif -= stock[0].price;
      console.log("sumDiff", sumDif);
      console.log("stock.ticker", stock[0].ticker);
      NewObject[stock[0].ticker] = sumDif;
    });
    console.log(NewObject);
  });
  return NewObject;
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
stocks.biggestGainer = function (data) {
  // YOUR CODE HERE
  var arr = stocks.gainAndLoss(data);
  var max = 0,
    maxName;
  for (var key in arr) {
    if (arr[key] > max) {
      max = arr[key];
      maxName = key;
    }
  }
  return maxName;
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
stocks.biggestLoser = function (data) {

  var arr = stocks.gainAndLoss(data);
  var min = Infinity,
    minName;
  for (var key in arr) {
    if (arr[key] < min) {
      min = arr[key];
      minName = key;
    }
  }
  return minName;
};

// Exercise 4. stocks.widestTradingRange(data)
//
// Write a function that finds the ticker of the stock with the widest trading
// range (biggest difference between the lowest and the highest stock price)
// over the lifetime of the given dataset.
//
// Example.
// stocks.widestTradingRange(data) -> 'AMZN'
stocks.widestTradingRange = function (data) {
  var NewObject = {};
  var arr = _.groupBy(data, function (stock) {
    return stock.ticker;
  });

  arr = _.forEach(arr, function (stock) {
    stock.sort(function (a, b) {
      return Date.parse(b.price) - Date.parse(a.price);

    });
    arr = _.forEach(arr, function (stock) {
      var sumDif = stock[stock.length - 1].price;
      sumDif -= stock[0].price;
      console.log("sumDiff", sumDif);
      console.log("stock.ticker", stock[0].ticker);
      NewObject[stock[0].ticker] = sumDif;
    });
    console.log(NewObject);
  });
  var min = Infinity,
    minName;
  for (var key in NewObject) {
    if (NewObject[key] < min) {
      min = NewObject[key];
      minName = key;
    }
  }
  return minName;
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
stocks.portfolioValue = function (data, date, portfolio) {
  // YOUR CODE HERE
  var arr = _.groupBy(data, function (stock) {
    return stock.ticker;
  });
  var totalprice = 0;

  for (var key in portfolio) {
    console.log(arr[key]);
    var tmp = _.forEach(arr[key], function (stock) {
      //  console.log(stock);
      //  console.log(stock.time);
      if (Date.parse(stock.time) === Date.parse(date)) {
        console.log("im in");
        if (portfolio[key] !== 0) {
          totalprice += stock.price * portfolio[key];
        }
      }
    });


  }
  console.log("totalprice", totalprice);
  return totalprice;
}



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
stocks.bestTrade = function (data, ticker) {


  //chain the code after talking with moose and looking at the code to clean the code
  var stocks = _.chain(data)
    .filter(function (tmp) {
      return tmp.ticker === ticker;
    })
    .sortBy(function (tmp) {
      return new Date(tmp.time);
    })
    .value();

  console.log("trade", stocks);

  var diffPrice = stocks[1].price - stocks[0].price;
  var minPrice = stocks[0].price;

  var buyNow = 0;
  var buyIndex = 0;
  var sellIndex = 1;


  for (var i = 1; i < stocks.length; i++) {
    var priceNow = stocks[i].price;
    var diff = priceNow - minPrice;
    if (diff > diffPrice) {
      diffPrice = diff;
      buyIndex = buyNow;
      sellIndex = i;
    }
    if (priceNow < minPrice) {
      minPrice = priceNow;
      buyNow = i;
    }
  }
  var sellDate = new Date(stocks[sellIndex].time);
  var buyDate = new Date(stocks[buyIndex].time);
  console.log(sellIndex);
  console.log(buyIndex);
  return [buyDate, sellDate, diffPrice];
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
stocks.bestTradeEver = function (data) {
  // YOUR CODE HERE
  return _.chain([
    'GOOG',
    'NFLX',
    'FB',
    'MSFT',
    'AMZN',
    'NVDA'
  ])
    .map(function (name) {
      return [name].concat(stocks.bestTrade(data, name));
    }).max(3) //the third elemet of the return is the price
    .value();
};
