const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const salesProduct = async (req) => {
  const sales = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: req.body }));
  return {
    _id: sales.insertedId,
    itensSold: data,
  };
};

module.exports ={
  salesProduct
};
