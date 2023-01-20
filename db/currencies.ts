const currencies = require('./mongodb')//.db('rates').collection('usd');
const ObjectId = require('mongodb').ObjectId;
import {collections} from "./mongodb"

interface curr {
    currency: string,
    rate: number
}

// getAll ... Get all currency rates.
export async function getAll(): Promise<any> {
    const cursor = collections.usd?.find({});
    return cursor?.toArray();
}

// getByName ... Get currency according to provided name.
export async function getByName (name: string): Promise<any> {
    return await collections.usd?.findOne({currency: name})
}

// insertNew ... Create new record.
export async function insertNew ({currency, rate}: curr) {
    const result = await collections.usd?.insertOne({currency, rate});
    console.log(result)
    // return result.ops[0]
}

// updateCurrency ... Update existing currency.
export async function updateCurrency (name: string, rate: number) {
    const result = await collections.usd?.updateOne({currency: name}, {$set: {currency: name, rate: rate}});
    console.log(result)
    // return result.ops[0]    
}

// removeByName ... Remove currency by name.
export async function removeByName (name: string) {
    await collections.usd?.deleteOne({currency: name});
}