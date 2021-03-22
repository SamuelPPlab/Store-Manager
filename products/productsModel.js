const { ObjectId } = require('mongodb');

const connection = require('../connection');

const createProduct = async (name, quantity) => {
  console.log('model - products');
  const { insertedId } =  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { _id: insertedId, name, quantity };
};

const findByName = async (name) => {
  const existsProduct = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return existsProduct ? true : false;
};

module.exports = {
  createProduct,
  findByName,
};
