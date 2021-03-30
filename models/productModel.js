const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (product) => connection()
  .then((db) => db.collection('products').insertOne(product));

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getProduct = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const editProduct = async ({ id, name, quantity }) => connection()
  .then((db) => db.collection('recipe').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity} },
  ));

const delProduct = async (id) => connection()
  .then((db) => db.collection('recipe').deleteOne({ _id: Object(id) }));

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  editProduct,
  delProduct,
};
