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
    .then((db) => db.collection('products').find().toArray());
};

const updateProduct = async (id, { name, quantity}) => {
  return await connection()
    .then((db) => db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .then(() => ({ _id: id, name, quantity }));
};

const deleteProduct = async (id, { name, quantity}) => {
  return await connection()
    .then((db) => db
      .collection('products')
      .deleteOne({ _id: ObjectId(id) }))
    .then(() => ({ _id: id, name, quantity }));
};

module.exports = {
  insertProduct,
  findProductByName,
  findProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};