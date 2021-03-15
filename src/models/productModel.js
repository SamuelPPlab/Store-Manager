const connection = require('../database/connection');
const { ObjectId } = require('mongodb');
const collection = 'products';
const { throwError } = require('../utils/errorHandler');
const { status, errors } = require('../utils/status');

const createProduct = async (name, quantity) => {
  const createdProduct = await connection().then((db) =>
    db.collection(collection).insertOne({ name, quantity }),
  );

  return createdProduct;
};

const getByName = async (name) => {
  const product = await connection().then((db) =>
    db.collection(collection).findOne({ name }),
  );

  return product;
};

const getAllProducts = async () => {
  const allProducts = await connection().then((db) =>
    db.collection(collection).find().toArray(),
  );

  return allProducts;
};

const getProductById = async (id) => {
  const product = await connection()
    .then((db) => db.collection(collection).findOne({ _id: ObjectId(id) }))
    .catch((err) => {
      throw new throwError(status.unprocessableEntity, errors.wrongId);
    });

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await connection().then((db) => {
    db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    );
  });

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await connection()
    .then((db) => {
      db.collection(collection).deleteOne({ _id: ObjectId(id) });
    })
    .catch((err) => {
      throw new throwError(status.unprocessableEntity, errors.wrongId);
    });
  return deletedProduct;
};

module.exports = {
  createProduct,
  getByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
