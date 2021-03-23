const connection = require('./Connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  const newSale = { itensSold: sale };
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne(newSale));

  return {
    _id: insertedId,
    ...newSale,
  };
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, sale) => {
  return await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: sale } }
    ));
};

const remove = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove
};
