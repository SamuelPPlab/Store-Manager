const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertProduct = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const findProductByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products')
      .findOne({ 'name': { $eq: name } }));
};

const findProductById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find({}).toArray());
};
module.exports = {
  insertProduct,
  findProductByName,
  findProductById,
  getAllProducts,
};