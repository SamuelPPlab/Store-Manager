const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const produtoCriado = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => ({ _id: result.insertedId, name, quantity }));
  return produtoCriado;
};

const getAllProducts = async () => await connection()
  .then((db) => db.collection('products').find().toArray());

const findByIdProducts = async (id) => {
  const productData = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  if (!productData) return null;
  const { name, quantity } = productData;
  return { _id: id, name, quantity };
};

const updateProduct = (id, name, quantity) => 
  connection().then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: {  name, quantity } }
  )
  );

const deleteProduct = async (id) => {
  connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

const createSales  = async (itensSold) => {
  const { insertedId } = await connection()
    .then(db => db.collection('sales').insertOne( { itensSold } )); 
  return  { _id: insertedId, itensSold: itensSold
  };
};

const getAllSales = async() => await connection()
  .then((db) => db.collection('sales').find().toArray());

const findSalesById = async (id) => {
  const saleData = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  if (!saleData) return null;
  return saleData;
};

module.exports = {
  createProduct,
  getAllProducts,
  findByIdProducts,
  updateProduct,
  deleteProduct,
  createSales,
  getAllSales,
  findSalesById
};
