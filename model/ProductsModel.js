const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const findProductByName = async (name) => connection().then((db) => db
  .collection('products').findOne({ name }));

const createProduct = async (name, quantity) => {
  const create = await connection().then((db) => 
    db.collection('products').insertOne({ name, quantity }));
  return create.insertedId;
};

const updateProduct = async (id, objProduct) => {
  await connection().then(
    (db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: objProduct }
    ) 
  );
  return {
    _id: id,
    ...objProduct,
  };
};

const deleteProduct = async(id) => {
  const remove = await connection().then(
    (db) => db.collection('products').deleteOne({ _id: ObjectId(id) })
  );
  return remove;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  findProductByName,
  updateProduct,
  deleteProduct
};
