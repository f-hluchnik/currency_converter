import * as mongoDB from "mongodb";

export const collections: { currencies?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient('mongodb://172.18.0.2:27017/');        
    await client.connect();    
    const db: mongoDB.Db = client.db('currencyRates');
    const currencyCollection: mongoDB.Collection = db.collection('currencies');
    collections.currencies = currencyCollection;   
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${currencyCollection.collectionName}`);
 }