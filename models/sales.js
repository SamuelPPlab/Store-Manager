const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const findById = async (id) =>
  connection().then((db) => db.collection('sales').findOne(ObjectId(id)));

const findByName = async(productName) => 
  connection().then((db) => db.collection('sales').findOne({ name: productName }));

const create = async (sale) =>
  connection()
    .then((db) =>
      db.collection('sales').insertOne(sale)
    )
    .then((result) => result);

// const update = async (id, newProduct, newQuantity) =>
//   connection()
//     .then((db) => db.collection('sales').findOneAndUpdate(
//       { _id: ObjectId(id) },
//       { $set: {
//         productId: newProduct,
//         quantity: newQuantity,
//       } },
//       { returnOriginal: false },
//     ))
//     .then((result) => result.value);

const deleteProduct = async (id) => 
  connection()
    .then((db) => db.collection('sales').findOneAndDelete(
      { _id: ObjectId(id) },
    ))
    .then((result) => result.value);

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  // update,
  deleteProduct,
};