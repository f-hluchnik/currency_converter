const currencies = require('./mongodb').db('rates').collection('usd');

const ObjectId = require('mongodb').ObjectId;

interface curr {
    currency: string,
    rate: number
}

// save ... Create new record.
const save = async ({currency, rate}: curr) => {
    const result = await currencies.insertOne({currency, rate});
    return result.ops[0]
}

// getAll ...
const getAll = async () => {
    const cursor = await currencies.find();
    return cursor.toArray();
}

// getById ...
const getById = async (id: string) => {
    return await currencies.findOne({_id:ObjectId(id)})
}

// update ...
const update = async (id: string, {currency, rate}: curr) => {
    const result = await currencies.replaceOne({_id:ObjectId(id)}, {currency, rate});
    return result.ops[0]    
}

// remove ...
const removeById = async (id: string) => {
    await currencies.deleteOne({_id:ObjectId(id)});
}

module.exports = {getAll, getById, removeById, save, update}