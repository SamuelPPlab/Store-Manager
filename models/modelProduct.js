const connection = require('./connection');

const insertProduct = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const findProduct = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ 'name': { $eq: name } }));
};

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find({}).toArray());
};
module.exports = {
  insertProduct,
  findProduct,
  getAllProducts,
};