const { ObjectId } = require('mongodb');

const connection = require('../connection');

const createSale = async (sales) => {
  console.log('model - sales');
  const { insertedId } =  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));
  return { _id: insertedId, itensSold: sales };
};

const getAllSales = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return allSales;
};

const findById = async (id) => {
  const saleById = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return saleById;
};


const updateSale = async (id, sales) => {
  await connection()
    .then((db) => db.collection('sales').updateOne(
      {_id: ObjectId(id)}, {$set: {itensSold: sales}}
    ));
  return { _id: id, itensSold: sales };
};

const deleteSale = async (id) => {
  const deletedSale = await connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id)}));
  return deletedSale;
};


module.exports = {
  createSale,
  getAllSales,
  findById,
  updateSale,
  deleteSale,
};
