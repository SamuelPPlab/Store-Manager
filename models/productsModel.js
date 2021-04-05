const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const findProductsByName = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

const findProductsById = async (id) => {
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const createProducts = async (name, quantity) => {
  return await connection().then((db) =>
    db.collection('products').insertOne({
      name,
      quantity,
    }),
  );
};

const updateProducts = async (id, name, quantity) => {
  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: {name, quantity}}),
  );
  
  return {name, quantity};
};

const deleteProducts = async (id) => {
  return await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }),
  );
};

module.exports = {
  getAllProducts,
  findProductsByName,
  findProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};
