const connection = require('./connection');
const { ObjectId } = require('mongodb');
const collection = 'products';

const createProduct = async (name, quantity) => {
  return connection().then((db) => (
    db.collection(collection).insertOne({ name, quantity })
  ));
};

const getAllProducts = async () => {
  return connection().then((db) => (
    db.collection(collection).find().toArray()
  ));
};

const updateProduct = async (id, name, quantity) => {
  return connection().then((db) => db.collection(collection).updateOne(
    { _id: ObjectId(id) }, {
      $set: { name, quantity },
    }));
};

const getProductById = async (id) => {
  return connection().then((db) => (
    db.collection(collection).findOne(ObjectId(id))
  ));
};

const findProductByName = async (name) => {
  return connection().then((db) => (
    db.collection(collection).findOne({ name: name })
  ));
};

const deleteProduct = async (id) => {
  return connection().then((db) => (
    db.collection(collection).deleteOne({ _id: ObjectId(id) })
  ));
};

module.exports = {
  createProduct,
  findProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
