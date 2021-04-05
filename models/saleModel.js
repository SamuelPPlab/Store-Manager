const connection = require('./connection');
const { ObjectId } = require('mongodb');

const salesProduct = async (data) => {
  const sales = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: data }));
  return {
    _id: sales.insertedId,
    itensSold: data,
  };
};

const getSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const editSalesDb = async (id, data) => connection()
  .then((db) => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: data } },
  ));

module.exports ={
  salesProduct,
  getSales,
  getById,
  editSalesDb,
};
