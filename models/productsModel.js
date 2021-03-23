const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  return connection().then((db) =>
    db.collection('products').find().toArray());
};

const findProductByName = async (name) => {
  return await connection().then((db) =>
    db.collection('products').findOne({name}));
};

const findProductsById = async (id) => {
  return connection().then((db) =>
    db.collection('products').find(ObjectId(id)));
};

const createProducts = async (name, quantity) => {
  return await connection().then((db) =>
    db.collection('products').insertOne({
      name,
      quantity,
    }),
  );
};


module.exports = {
  getAllProducts,
  findProductByName,
  findProductsById,
  createProducts,
};
