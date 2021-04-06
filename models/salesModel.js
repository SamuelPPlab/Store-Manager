const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (sales) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: sales }),
  );

  return { _id: insertedId, itensSold: sales};
};

const getAllSales = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const findSalesById = async (id) => {
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSales = async (id, itensSold) => {
  return await connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: {itensSold}}),
  );
  
};

const deleteSales = async (id) => {
  return await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }),
  );
};

module.exports = {
  createSales,
  getAllSales,
  findSalesById,
  updateSales,
  deleteSales,
};
