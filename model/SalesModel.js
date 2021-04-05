const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSale = async (arrayProductsSold) => {
  const registeredSale = {
    itensSold: arrayProductsSold,
  };

  const { insertedId } = await connection().then((db) => {
    return db.collection('sales').insertOne(registeredSale);
  });

  return insertedId;
};

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  return connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id)));
};

const updateSale = async (id, arrayProductsSold) => {
  const registeredSale = {
    itensSold: arrayProductsSold,
  };
  const { insertedId } = await connection().then((db) => {
    return db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: registeredSale }
    );
  });
  return insertedId;
};

const deleteSale = async (id) => {
  return connection().then((db) =>
    db.collection('sales').deleteOne({
      _id: ObjectId(id)
    }));
};

module.exports = {
  registerSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};
