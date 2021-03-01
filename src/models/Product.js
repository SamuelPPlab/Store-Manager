const connection = require('./connection');
const { ObjectId } = require('mongodb');

const DB_COLECTION = 'products';

const createNewProduct = async (name, quantity) => {
  const { insertedId } = await connection().then((db) =>
    db.collection(DB_COLECTION).insertOne({ name, quantity }),
  );

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const getNameProduct = async (name) =>
  connection().then((db) => db.collection(DB_COLECTION).findOne({name}));

const getAllProducts = async () =>
  connection().then((db) => db.collection(DB_COLECTION).find().toArray());

const getByIdProduct = async (id) =>
  connection().then((db) => db.collection(DB_COLECTION).findOne(ObjectId(id)));

const updateProduct = async (id, name, quantity) =>
  connection().then((db) => db.collection(DB_COLECTION).updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } }
  ));

const deleteProduct = async (id) =>
  connection().then((db) => db.collection(DB_COLECTION).deleteOne(
    { _id: ObjectId(id) }
  ));

module.exports = {
  createNewProduct,
  getNameProduct,
  getAllProducts,
  getByIdProduct,
  updateProduct,
  deleteProduct
};
