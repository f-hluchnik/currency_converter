import Router from "koa-router";
import {getExchangeRate, insertNewExchangeRates} from "../../db/currencies";
import dotenv from 'dotenv';
dotenv.config()

type rawExchangeRates = {
    success: boolean
    timestamp: number
    base: string
    date: string
    rates: object
}

type exchangeRate = {
    sourceCurrency: string,
    targetCurrency: string,
    exchangeRate: number,
    timestamp: number
}

type multipleExchangeRates = Array<exchangeRate>

const currenciesRouter = new Router();

// currenciesRouter.get(`/`, async (ctx) => {
//     try {
//         ctx.body = await getAll();
//     } catch (err) {
//         console.error(err);
//     }
// })

// Returns exchange rate between provided currencies.
currenciesRouter.get(`/exchange/:source([A-z]{3})-:target([A-z]{3})`, async (ctx) => {
    try {
        ctx.body = await getExchangeRate(ctx.params.source.toUpperCase(), ctx.params.target.toUpperCase());
        if (ctx.body == null) {
            console.log("Download exchange rates from external API.")
            const newExchangeRates = await fetchNewExchangeRates(ctx.params.source)
            const preparedExchangeRates = await prepareData(newExchangeRates)
            await saveExchangeRates(preparedExchangeRates)
            ctx.body = await getExchangeRate(ctx.params.source.toUpperCase(), ctx.params.target.toUpperCase());
        }
    } catch (err) {
        console.error(err);
    }
})

// currenciesRouter.post(`/`, async (ctx) => {
//     try {
//         ctx.body = await insertNew({sourceCurrency: "USD", targetCurrency: "USD", exchangeRate: 1, timestamp: 23});
//     } catch (err) {
//         console.error(err);
//     }
// })

currenciesRouter.post(`/insertnewrates/`, async (ctx) => {
    try {
        await insertNewExchangeRates(ctx.request.body);
    } catch (err) {
        console.error(err);
    }
})

// currenciesRouter.put(`/`, async (ctx) => {
//     try {
//         ctx.body = await updateCurrency("USD", 3);
//     } catch (err) {
//         console.error(err);
//     }
// })

// currenciesRouter.delete(`/`, async (ctx) => {
//     try {
//         ctx.body = await removeByName("USD");
//     } catch (err) {
//         console.error(err);
//     }
// })

// getRates ... Fetch exchange rates from an external API.
async function fetchNewExchangeRates(base: string): Promise<rawExchangeRates> {
    var rawData: rawExchangeRates = {
        success: false,
        timestamp: 0,
        base: "",
        date: "",
        rates: {}
    }

    rawData = {
        success: true,
        timestamp: 1674320643,
        base: 'USD',
        date: '2023-01-21',
        rates: {
          AUD: 1.436404,
          BTC: 0.000043072831,
          CHF: 0.92001,
          CZK: 21.98605,
          DKK: 6.853304,
          EUR: 0.91935,
          GBP: 0.807168,
          JPY: 129.55504,
          PLN: 4.13765,
          USD: 1
        }
      }
    return rawData;

    // const apiKey = process.env.APIKEY || ""
    // console.log(apiKey)
    // var apiURL = "https://api.apilayer.com/fixer/latest?base=" + base;
    // try {
    //     const response = await fetch(apiURL, {
    //         method: 'GET',
    //         headers: {
    //           Accept: 'application/json',
    //           'apikey': apiKey
    //         },
    //       });
      
    //       if (!response.ok) {
    //         throw new Error(`Error! status: ${response.status}`);
    //       }
    //       return await response.json();
    // } catch (error) {
    //     if (error instanceof Error) {
    //         console.log('error message: ', error.message);
    //         return rawData;
    //     } else {
    //         console.log('unexpected error: ', error);
    //         return rawData;
    //     }
    // }
}

// saveRates ... Saves multiple exchange rates to database.
async function saveExchangeRates(newRates: multipleExchangeRates) {
    try {
        const response = await fetch('http://localhost:7654/insertnewrates/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(newRates),
            });
        
            console.log("status: " + response.statusText)
            if (response.status != 200) {
                throw new Error(`Error! status: ${response.status}`);
            }
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

// prepareData ... Prepares data for insertion to db.
async function prepareData(rawData: rawExchangeRates): Promise<multipleExchangeRates> {
    if (typeof rawData != 'object') {
        rawData = JSON.parse(rawData)
    }
    const sourceCurrency = rawData.base;
    const timestamp = rawData.timestamp;
    const exchangeRates = rawData.rates;
    var preparedData: multipleExchangeRates = [];
    Object.entries(exchangeRates).forEach((entry) => {
        const [key, value] = entry;
        const val = parseFloat(value)
        preparedData.push({sourceCurrency: sourceCurrency, targetCurrency: key, exchangeRate: val, timestamp: timestamp})
      });
    return preparedData;
}

export default currenciesRouter;