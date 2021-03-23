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

const getAll = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('products').find().toArray());
  return allProducts;
};

const findById = async (id) => {
  const productById = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  return productById;
};

const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await connection()
    .then((db) => db.collection('products').updateOne(
      {_id: ObjectId(id)}, {$set: {name, quantity}}
    ));
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const deletedProduct = await connection()
    .then((db) => db.collection('products').deleteOne({_id: ObjectId(id)}));
  return deletedProduct;
};

module.exports = {
  createProduct,
  findByName,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
};
