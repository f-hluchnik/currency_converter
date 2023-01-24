import {collections} from "./mongodb"

type exchangeRate = {
    sourceCurrency: string,
    targetCurrency: string,
    exchangeRate: number,
    timestamp: number
}

type multipleExchangeRates = Array<exchangeRate>

// getAll ... Get all currency rates.
export async function getAll(): Promise<any> {
    const cursor = collections.currencies?.find({});
    return cursor?.toArray();
}

// getExchangeRate ... Get exchange rate between two currencies.
export async function getExchangeRate (source: string, target: string): Promise<any> {
    return await collections.currencies?.findOne({sourceCurrency: source, targetCurrency: target})
}

// insertNew ... Create new record.
export async function insertNew (newRecord: exchangeRate) {
    const result = await collections.currencies?.insertOne(newRecord);
    // console.log(result)
}

// insertNewExchangeRates ... Insert multiple new exchange rates.
export async function insertNewExchangeRates (newRecords: any) {
    return await collections.currencies?.insertMany(newRecords);
}

// updateCurrency ... Update existing currency.
export async function updateCurrency (name: string, rate: number) {
    const result = await collections.currencies?.updateOne({currency: name}, {$set: {currency: name, rate: rate}});
    console.log(result)
    // return result.ops[0]    
}

// removeByName ... Remove currency by name.
export async function removeByName (name: string) {
    await collections.currencies?.deleteOne({currency: name});
}