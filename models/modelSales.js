const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertSales = async (sales) => {
  return await connection()
    .then((db) => db.collection('sales').insert({ itensSold: sales }));
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};
const findByIdSale = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const putByIdSale = async (id, sales) => {
  return await connection()
    .then((db) => db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } }))
    .then(() =>  ({ _id:id, itensSold: sales }));
};

const deleteByIdSale = async (id) => {
  return await connection()
    .then((db) => db
      .collection('sales')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  insertSales,
  getAllSales,
  findByIdSale,
  putByIdSale,
  deleteByIdSale,
};

