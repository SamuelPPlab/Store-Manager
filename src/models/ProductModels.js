const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray());

const create = (data) =>
  connection()
    .then((db) => db.collection('products').insertOne(data));

const getById = async (id) =>
  connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

const update = async (id, name, quantity) => {
  connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name: name, quantity: quantity } }));
};

const destroy = async (id) =>
  connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  create,
  getById,
  update,
  destroy,
};
