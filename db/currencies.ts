const currencies = require('./mongodb')//.db('rates').collection('usd');
const ObjectId = require('mongodb').ObjectId;
import {collections} from "./mongodb"

interface curr {
    currency: string,
    rate: number
}

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
export async function insertNew (obj: myObject) {
    const result = await collections.currencies?.insertOne(obj);
    console.log(result)
    // return result.ops[0]
}

type myArray = [
    obj: myObject
]

type myObject = {
    sourceCurrency: string,
    targetCurrency: string,
    exchangeRate: number,
    timestamp: number
}

// insertManyNew ... Create new record.
export async function insertManyNew (arr: any) {
    const result = await collections.currencies?.insertMany(arr);
    // console.log(result)
    //@ts-ignore
    return result
    // return result.ops[0]
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