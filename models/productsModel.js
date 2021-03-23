const connection = require('./connection');

const getAllProducts = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const createProducts = async (name, quantity) => {
  return await connection().then((db) =>
    db.collection('products').insertOne({
      name,
      quantity,
    }),
  );
};

const findProductbyName = async (name) => {
  return await connection().then((db) =>
    db.collection('products').findOne({name}));
};

module.exports = {
  getAllProducts,
  createProducts,
  findProductbyName,
};
