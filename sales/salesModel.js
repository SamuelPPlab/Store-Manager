const { ObjectId } = require('mongodb');

const connection = require('../connection');

const createSale = async (sales) => {
  console.log('model - sales');
  const { insertedId } =  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));
  return { _id: insertedId, itensSold: sales };
};

module.exports = {
  createSale,
};
