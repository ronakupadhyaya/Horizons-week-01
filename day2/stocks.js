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

  var companies=_.groupBy(data, function(transaction){
    return transaction.ticker;
   
  })
  // console.log(temp);
  var makeCompany= function(latestDate, earliestDate, latestDateP, earliestDateP){
    latestDate=this.latestDate;
    earliestDate
  }


  
  return _.mapObject(companies, function(transactions){

    var latestDate=new Date(transactions[0].time);
    var earliestDate=new Date(transactions[0].time);
    var latestDateP=transactions[0].price;
    var earliestP=transactions[0].price;

    // console.log(latestDate, latestDateP);

    transactions.forEach(function(transaction){
      if (new Date(transaction.time)>latestDate){
         latestDate=new Date(transaction.time);
         latestDateP=transaction.price;
      }

      else if (new Date(transaction.time)<earliestDate){
        earliestDate=new Date(transaction.time);
        earliestP=transaction.price;
      }
      
    })
    // console.log(earliestDate, latestDate)
    return latestDateP-earliestP;


    // reduce(transactions, function(transaction){
    //   return earliestDate
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
  // YOUR CODE HERE
  var newData=stocks.gainAndLoss(data);
  // console.log(newData);
  var biggest=0;
  var company="";
_.forEach(newData, function(value, key){
  if(value>biggest){
    biggest=value;
    company=key;
  }
})
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
  // YOUR CODE HERE
    var newData=stocks.gainAndLoss(data);
  // console.log(newData);
  var smallest=1e1000;
  var company="";
_.forEach(newData, function(value, key){
  if(value<smallest){
    smallest=value;
    company=key;
  }
})
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
//THIS IS OUR OWN METHOD, ASSIGNMENT ONE BELOW THIS ONE 
stocks.lowestHighestPrice = function(data) {
  // YOUR CODE HERE


  var companies=_.groupBy(data, function(transaction){
    return transaction.ticker;
   
  })
  // console.log(temp);
  // var makeCompany= function(latestDate, earliestDate, latestDateP, earliestDateP){
  //   latestDate=this.latestDate;
  //   earliestDate
  // }


  
  return _.mapObject(companies, function(transactions){

    // var latestDate=new Date(transactions[0].time);
    // var earliestDate=new Date(transactions[0].time);
    var highestValue=transactions[0];
    var lowestValue=transactions[0];

    // console.log(latestDate, latestDateP);

    transactions.forEach(function(transaction){
      if (transaction.price>highestValue.price){
         highestValue=transaction;
      } else if (transaction.price<lowestValue.price){
         lowestValue=transaction;
      }
      
    })
    // console.log(lowestValue, highestValue)
    return [lowestValue, highestValue]

  })
};

stocks.widestTradingRange = function(data) {
  var newData = stocks.lowestHighestPrice(data)
  // console.log(newData)

  newData = _.mapObject(newData, function(value, key) {
    return value[1].price - value[0].price
  })
  // console.log(newData)

  var widestCompany = ""
  var widestChange = 0

  _.forEach(newData, function(value, key) {
    if (value > widestChange) {
      widestCompany = key
      widestChange = value
    }
  })

  return widestCompany

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
  var companies = _.groupBy(data, function(transaction){
    return transaction.ticker;
  })
  // console.log(companies)
  companies = _.mapObject(companies, function(transactions) {
    var return_price = 0; 
    // console.log(transactions)
    transactions.forEach(function(transaction) {
      if ((new Date(transaction.time)).getDate() === date.getDate()) {
        console.log((new Date(transaction.time)).toTimeString())
        console.log(date.getUTCMilliseconds());
        return_price = transaction.price
      }
    })
    return return_price;
  })
  // console.log(companies)

  var portfolio_value = 0
  _.forEach(portfolio, function(value, key) {
    console.log(companies, value, companies[key])
    portfolio_value += value * companies[key]
  })
  return portfolio_value

};






// new Date(transaction.date) === date ? return_price = transaction.price
      // console.log(transaction.time, date)


// // if ((new Date(transaction.time)).toUTCString === date.toUTCString) {
      //   console.log(typeof transaction.time.toUTCString());
      //   console.log(typeof date.toUTCString());
      //   // if (transaction.time.toUTCString() === date.toUTCString()) {
      // if(!(new Date(transaction.time) > date ||
      //      new Date(transaction.time) <date)){
      //   console.log(transaction.time, date);
      //   return_price = transaction.price;
      // }

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
