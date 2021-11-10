const connection = require('./connection');
const { ObjectId } = require('mongodb');
const collection = 'sales';

const createSale = async (itensSold) => {
  return connection().then((db) => (
    db.collection(collection).insertOne({ itensSold })
  ));
};

const getAllSales = async () => {
  return connection().then((db) => (
    db.collection(collection).find().toArray()
  ));
};

const updateSale = async (id, itensSold) => {
  return connection().then((db) => db.collection(collection).updateOne(
    { _id: ObjectId(id) }, {
      $set: { itensSold },
    }));
};

const getSaleById = async (id) => {
  return connection().then((db) => (
    db.collection(collection).findOne(ObjectId(id))
  ));
};

const findSaleByName = async (name) => {
  return connection().then((db) => (
    db.collection(collection).findOne({ name: name })
  ));
};

const deleteSale = async (id) => {
  return connection().then((db) => (
    db.collection(collection).deleteOne({ _id: ObjectId(id) })
  ));
};

module.exports = {
  createSale,
  findSaleByName,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
