import * as mongoDB from "mongodb";
import { config } from "../src/config";

const MONGODB_URL = config.mongodb_url;

export const collections: { currencies?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(MONGODB_URL);        
    await client.connect();    
    const db: mongoDB.Db = client.db('currencyRates');
    const currencyCollection: mongoDB.Collection = db.collection('currencies');
    collections.currencies = currencyCollection;   
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${currencyCollection.collectionName}`);
 }