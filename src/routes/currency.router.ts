import Router from "koa-router";
const https = require('https');
const { resolve } = require('path');
import {getAll, getExchangeRate, insertNew, insertManyNew, updateCurrency, removeByName} from "../../db/currencies";

const currenciesRouter = new Router();

currenciesRouter.get(`/`, async (ctx) => {
    try {
        ctx.body = await getAll();
    } catch (err) {
        console.error(err);
    }
})

// Returns exchange rate between provided currencies.
currenciesRouter.get(`/exchange/:source([A-z]{3})-:target([A-z]{3})`, async (ctx) => {
    try {
        ctx.body = await getExchangeRate(ctx.params.source.toUpperCase(), ctx.params.target.toUpperCase());
        if (ctx.body == null) {
            console.log("Download exchange rates from external API.")
            const d = await getRates()
            const da = await reorganizeData(d)
            await saveRates(da)
            console.log("Converting " + ctx.params.source.toUpperCase() + " to " + ctx.params.target.toUpperCase() + ".")
            ctx.body = await getExchangeRate(ctx.params.source.toUpperCase(), ctx.params.target.toUpperCase());
            // ctx.status = 200;
            // ctx.body = {
            //     "_id": "0",
            //     "timestamp": "0",
            //     "exchangeRate": 0,
            //     "sourceCurrency": "DEF",
            //     "targetCurrency": "DEF"
            // }
            // console.log(ctx.body)
        }
        if (ctx.body != null) {
            ctx.status = 200;
        }
    } catch (err) {
        console.error(err);
    }
})

currenciesRouter.post(`/`, async (ctx) => {
    try {
        ctx.body = await insertNew({sourceCurrency: "USD", targetCurrency: "USD", exchangeRate: 1, timestamp: 23});
    } catch (err) {
        console.error(err);
    }
})

currenciesRouter.post(`/insertmany/`, async (ctx) => {
    try {
        await insertManyNew(ctx.request.body);
    } catch (err) {
        console.error(err);
    }
})

currenciesRouter.put(`/`, async (ctx) => {
    try {
        ctx.body = await updateCurrency("USD", 3);
    } catch (err) {
        console.error(err);
    }
})

currenciesRouter.delete(`/`, async (ctx) => {
    try {
        ctx.body = await removeByName("USD");
    } catch (err) {
        console.error(err);
    }
})

// getRates ... Fetch exchange rates from an external API.
async function getRates(base = "USD") {
    // const mockRates = {
    //     success: true,
    //     timestamp: 1674320643,
    //     base: 'USD',
    //     date: '2023-01-21',
    //     rates: {
    //       AUD: 1.436404,
    //       BTC: 0.000043072831,
    //       CHF: 0.92001,
    //       CZK: 21.98605,
    //       DKK: 6.853304,
    //       EUR: 0.91935,
    //       GBP: 0.807168,
    //       JPY: 129.55504,
    //       PLN: 4.13765,
    //       USD: 1
    //     }
    //   }
    // return JSON.stringify(mockRates);


    const apiKey = "08czXTK52Du0UbTN5PPiSz9q4sCJL2wn";
    var myurl = "https://api.apilayer.com/fixer/latest?base=" + base;
    try {
        const response = await fetch(myurl, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'apikey': apiKey
            },
          });
      
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
      
          const result = (await response.json());
          return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}



type myObject = {
    sourceCurrency: string,
    targetCurrency: string,
    exchangeRate: number,
    timestamp: number
}

type myArray = Array<myObject>

// saveRates ... save multiple exchange rates to database
async function saveRates(rates: any) {
    // console.log(JSON.stringify(rates))
    // console.log(typeof rates)
    try {
        const response = await fetch('http://localhost:7654/insertmany/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(rates),
            });
        
            console.log("status: " + response.statusText)
            if (response.status != 200) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            // const result = (await response.json());
            // return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }

}

// reorganizeData ... Prepares data for insertion to db.
async function reorganizeData(data: any): Promise<myArray> {
    var jsdata = data;
    if (typeof data != 'object') {
        jsdata = JSON.parse(data)
    }
    const srcCur = jsdata.base;
    const tmstmp = jsdata.timestamp;
    const rates = jsdata.rates;
    var a: myArray|any = [];// = [{sourceCurrency: "", targetCurrency: "", exchangeRate: 1, timestamp: 1}]
    Object.entries(rates).forEach((entry) => {
        const [key, value] = entry;
        // console.log(`${key}: ${value}`);
        //@ts-ignore
        const val = parseFloat(value)
        a.push({sourceCurrency: srcCur, targetCurrency: key, exchangeRate: val, timestamp: tmstmp})
      });
    return a;
}

export default currenciesRouter;