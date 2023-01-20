import * as mongoDB from "mongodb";

export const collections: { usd?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient('mongodb://172.18.0.2:27017/');        
    await client.connect();    
    const db: mongoDB.Db = client.db('rates');
    const usdCollection: mongoDB.Collection = db.collection('usd');
    collections.usd = usdCollection;   
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usdCollection.collectionName}`);
 }