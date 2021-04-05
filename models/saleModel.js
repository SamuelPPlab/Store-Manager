const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const salesProduct = async (data) => {
  const sales = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: data }));
  return {
    _id: sales.insertedId,
    itensSold: data,
  };
};

const getSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray);

const getById = async () => connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

module.exports ={
  salesProduct,
  getSales,
  getById,
};
