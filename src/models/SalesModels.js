const  { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (data) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold: data }));
  const {insertedId } = sale;
  return {
    _id: insertedId,
    itensSold: data,
  };
};

const getAllSales = () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const getByIdSales = async (id) =>
  connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSales = async (id, data) =>
  connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: data } }));

const destroySales = async (id) =>{
  const toBeDestroyed = await connection()
    .then((db) => db.collection('sales').findOne( ObjectId(id)));
  if(toBeDestroyed) {
    await connection()
      .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id)} ));
    return toBeDestroyed;
  }
  throw 'sale not found';
};

module.exports = {
  getAllSales,
  createSales,
  getByIdSales,
  updateSales,
  destroySales,
};
