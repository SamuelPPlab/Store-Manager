const connection = require('./Connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const getByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const findProductById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity} }
    ));
};

const remove = async (id) => {
  return await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getByName,
  getAll,
  findProductById,
  updateProduct,
  remove
};